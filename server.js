const express = require("express");
const app = express();

// GET method route
app.get("/user-bmr-amr-details", (req, res) => {
  const { weight, height, gender, years, activity_level, goal,goal_weight, weeks } =
    req.query;
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
  calories = ((goal_weight * 500) /
   weeks);
   
//daily calorie intake and burn calculation

  if (goal == "lose") {
   
    //workout section
    daily_calorie_burn_by_workout = 400;
    daily_calorie_burn_by_cardio = 200;

    //diet section
     daily_calorie_intake = amr - calories;
    daily_calorie_intake_by_carb = daily_calorie_intake * 40/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 40/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 20/100 ;


  } 
  
  if (goal == "maintain") {
   
    //workout section
    daily_calorie_burn_by_workout = 400;

    //diet section
    daily_calorie_intake == amr;
    daily_calorie_intake_by_carb = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 30/100 ;

   

  }


  if (goal == "gain") {

    //workout section
    daily_calorie_burn_by_workout = 400;

    //diet section
    daily_calorie_intake == amr + calories + 500;
    daily_calorie_intake_by_carb = daily_calorie_intake * 45/100 ;
    daily_calorie_intake_by_protein = daily_calorie_intake * 35/100 ;
    daily_calorie_intake_by_fat = daily_calorie_intake * 20/100 ;


  }

  
//response data
  res.json({
    bmr: bmr ? bmr : 0,
    amr: amr ? amr : 0,
    daily_calorie_intake : daily_calorie_intake ? daily_calorie_intake : 0,
    daily_calorie_burn_by_workout : daily_calorie_burnby_workout ? daily_calorie_burn_by_workout : 0,
    daily_calorie_burn_by_cardio : daily_calorie_burnby_cardio ? daily_calorie_burn_by_cardio : 0,
    daily_calorie_intake_by_carb: daily_calorie_intake_by_carb ? daily_calorie_intake_by_carb : 0,
    daily_calorie_intake_by_protein: daily_calorie_intake_by_protein ? daily_calorie_intake_by_protein : 0,
    daily_calorie_intake_by_fat: daily_calorie_intake_by_fat ? daily_calorie_intake_by_fat : 0,


    status: 200,
    user: { ...req.query },
  });
});

//Create a Server >> Calorie Calculation
const server = app.listen("8080", "127.0.0.1", function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
