const express = require("express");
const app = express();

// GET method route
app.get("/user-bmr-amr-details", (req, res) => {
  const { weight, height, gender, years, activicty_level, goal,expectedweight, weeks } =
    req.query;
  let bmr;
  let amr;
  let calories;
  let daily_calorie_intake;
  let daily_calorie_burnby_workout;
  let daily_calorie_burnby_cardio;
  let daily_calorie_intake_by_carb;
  let daily_calorie_intake_by_fat;
  let daily_calorie_intake_by_protein;
  
  
  if (gender == "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * years + 5;
  }

  if (gender == "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * years - 161;
  }

  if (activicty_level == "Sedentary") {
    amr = bmr * 1.2;
  }
  if (activicty_level == "Light Active") {
    amr = bmr * 1.375;
  }
  if (activicty_level == "Moderately Active") {
    amr = bmr * 1.55;
  }
  if (activicty_level == "Active") {
    amr = bmr * 1.725;
  }
  if (activicty_level == "Very Active") {
    amr = bmr * 1.9;
  }

  calories = (expectedweight * 500) / weeks;

  
  
  
  if (goal == "loser") {
    daily_calorie_intake = amr - calories;
    daily_calorie_burnby_workout = 400;
    daily_calorie_burnby_cardio = 200;
    daily_calorie_intake_by_carb = daily_calorie_intake * 40/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 40/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 20/100 ;


  } 
  
  if (goal == "maintain") {
    daily_calorie_intake == amr;
    daily_calorie_burnby_workout = 400;
    daily_calorie_intake_by_carb = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 30/100 ;

   

  }


  if (goal == "gain") {
    daily_calorie_intake == amr + calories + 500;
    daily_calorie_burnby_workout = 400;
    daily_calorie_intake_by_carb = daily_calorie_intake * 45/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 20/100 ;


  }

  

  res.json({
    bmr: bmr ? bmr : 0,
    amr: amr ? amr : 0,
    daily_calorie_intake : daily_calorie_intake ? daily_calorie_intake : 0,
    daily_calorie_burnby_workout : daily_calorie_burnby_workout ? daily_calorie_burnby_workout : 0,
    daily_calorie_burnby_cardio : daily_calorie_burnby_cardio ? daily_calorie_burnby_cardio : 0,
    daily_calorie_intake_by_carb: daily_calorie_intake_by_carb ? daily_calorie_intake_by_carb : 0,
    daily_calorie_intake_by_protein: daily_calorie_intake_by_protein ? daily_calorie_intake_by_protein : 0,
    daily_calorie_intake_by_fat: daily_calorie_intake_by_fat ? daily_calorie_intake_by_fat : 0,


    status: 200,
    user: { ...req.query },
  });
});

//Create a Server
const server = app.listen("8080", "127.0.0.1", function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
