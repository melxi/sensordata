const sensorsRoute = require("express").Router();
const axios = require("axios");
const Sensor = require("../models/sensor");

sensorsRoute.get("/", (req, res) => {
  try {
    Sensor.find({}).sort({ date: 1 }).then(data => res.json(data));
  } catch (err) {
    console.log(err);
  }
});

module.exports = sensorsRoute;
