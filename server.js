const express = require("express");
const app = express();

// GET method route
app.get("/user-bmr-amr-details", (req, res) => {
  const { weight, height, gender, years, activicty_level, goal,expectedweight, weeks } =
    req.query;
  let bmr;
  let amr;
  let calories;
  if (gender == "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * years + 5;
  }

  if (gender == "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * years + 161;
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
    
  }

  res.json({
    bmr: bmr ? bmr : 0,
    amr: amr ? amr : 0,
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
