const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const config = require('./utils/config');
const Sensor = require('./models/sensor');
const sensorsRoute = require('./controllers/sensors');
const publicPath = path.join(__dirname, 'client/build');

mongoose
.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
  
const CronJob = require('cron').CronJob;
const collectSensorData = new CronJob('0 */30 * * * *', async () => {
  console.log('You will see this message every minute');
  const options = {
    method: 'get',
    url: 'https://opendata.hopefully.works/api/events',
    headers: {
      Authorization: `Bearer ${config.TOKEN}`,
    },
  };

  try {
    const request = await axios(options);
    
    const newSensor = new Sensor({
      date: new Date(request.data.date),
      sensor1: request.data.sensor1 || 0,
      sensor2: request.data.sensor2 || 0,
      sensor3: request.data.sensor3 || 0,
      sensor4: request.data.sensor4 || 0,
    });
    
    newSensor.save();
  } catch (err) {
    console.log(err);
  }
});
collectSensorData.start();

const server = express();

server.use(cors());
server.use(express.json());

server.use(express.static(publicPath));
server.use('/api/events', sensorsRoute);

server.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
