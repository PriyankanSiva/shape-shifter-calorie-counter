import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore, doc, setDoc } from "firebase/firestore";
import express from "express";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4a60jpamK9KttdOlFNRhES0Z1OPz-c_o",
    authDomain: "shape-shifter-fitness-e89b7.firebaseapp.com",
    databaseURL: "shape-shifter-fitness-e89b7.firebaseio.com/",
    projectId: "shape-shifter-fitness-e89b7",
};

const app1 = initializeApp(firebaseConfig);
const db = getFirestore(app1);

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, "calculated_calorie_data");
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map((doc) => doc.data());
//     console.log(cityList);
//     return cityList;
// }

/**
 * when there is a new data, and saved under a new doc, then u have to use this method
 */
async function setDataFirestoreNewDoc(dbRef, collectionName, dataObject) {
    try {
        const docRef = await addDoc(collection(dbRef, collectionName), dataObject);
        return docRef.id;
    } catch (e) {
        console.log(e);
        throw "Failed on adding new doc";
    }
}

async function setDataFirestoreExistingDoc(dbRef, collectionName, documentId, dataObject) {
    try {
        await setDoc(doc(dbRef, collectionName, documentId), dataObject);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

function calculatedCalorie(req) {
    const { weight, height, gender, years, activity_level, goal, goal_weight, weeks } = req.query;

    let bmr;
    let amr;
    let calories;
    let daily_calorie_intake;
    let daily_calorie_burn_by_workout;
    let daily_calorie_burn_by_cardio;
    let daily_calorie_intake_by_carb;
    let daily_calorie_intake_by_fat;
    let daily_calorie_intake_by_protein;

    //bmr calculation

    if (gender == "male") {
        bmr = 10 * weight + 6.25 * height - 5 * years + 5;
    }

    if (gender == "female") {
        bmr = 10 * weight + 6.25 * height - 5 * years - 161;
    }

    //amr calculation

    if (activity_level == "sedentary") {
        amr = bmr * 1.2;
    }
    if (activity_level == "lightactive") {
        amr = bmr * 1.375;
    }
    if (activity_level == "moderatelyactive") {
        amr = bmr * 1.55;
    }
    if (activity_level == "active") {
        amr = bmr * 1.725;
    }
    if (activity_level == "veryactive") {
        amr = bmr * 1.9;
    }

    //calorie calculation
    calories = (goal_weight * 500) / weeks;

    //daily calorie intake and burn calculation

    if (goal == "lose") {
        //workout section
        daily_calorie_burn_by_workout = 400;
        daily_calorie_burn_by_cardio = 200;

        //diet section
        daily_calorie_intake = amr - calories;
        daily_calorie_intake_by_carb = (daily_calorie_intake * 40) / 100;
        daily_calorie_intake_by_protein = (daily_calorie_intake * 40) / 100;
        daily_calorie_intake_by_fat = (daily_calorie_intake * 20) / 100;
    }

    if (goal == "maintain") {
        //workout section
        daily_calorie_burn_by_workout = 400;

        //diet section
        daily_calorie_intake == amr;
        daily_calorie_intake_by_carb = (daily_calorie_intake * 35) / 100;
        daily_calorie_intake_by_protein = (daily_calorie_intake * 35) / 100;
        daily_calorie_intake_by_fat = (daily_calorie_intake * 30) / 100;
    }

    if (goal == "gain") {
        //workout section
        daily_calorie_burn_by_workout = 400;

        //diet section
        daily_calorie_intake == amr + calories + 500;
        daily_calorie_intake_by_carb = (daily_calorie_intake * 45) / 100;
        daily_calorie_intake_by_protein = (daily_calorie_intake * 35) / 100;
        daily_calorie_intake_by_fat = (daily_calorie_intake * 20) / 100;
    }

    return {
        bmr: bmr ? bmr : 0,
        amr: amr ? amr : 0,
        daily_calorie_intake: daily_calorie_intake ? daily_calorie_intake : 0,
        daily_calorie_burn_by_workout: daily_calorie_burn_by_workout ? daily_calorie_burn_by_workout : 0,
        daily_calorie_burn_by_cardio: daily_calorie_burn_by_cardio ? daily_calorie_burn_by_cardio : 0,
        daily_calorie_intake_by_carb: daily_calorie_intake_by_carb ? daily_calorie_intake_by_carb : 0,
        daily_calorie_intake_by_protein: daily_calorie_intake_by_protein ? daily_calorie_intake_by_protein : 0,
        daily_calorie_intake_by_fat: daily_calorie_intake_by_fat ? daily_calorie_intake_by_fat : 0,

        /* status: 200,
        user: { ...req.query }, */
    };
}

var app = express();
app.get("/user-bmr-amr-details", async function (req, res) {
    let data = calculatedCalorie(req);
    try {
        let docId = await setDataFirestoreNewDoc(db, "calculated_calorie_data", data);
        res.send({ docId }).status(201);
    } catch (e) {
        res.send({ msg: "failed" }).status(404);
    }
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
