/* eslint-disable no-console */
import express from 'express';
import * as csv from './csv';

const app = express();

// Routes
app.get('/data/stations', (req, res) => {
  console.log('request to /data/stations');
  if (!csv.data.isComplete) res.status(202).send('Analysis not complete');
  else res.json(csv.data.stations);
});

app.get('/data/stationsAt/:time', (req, res) => {
  console.log('request to /data/stationsAt');
  if (!csv.data.isComplete) res.status(202).send('Analysis not complete');
  else {
    const time = parseInt(req.params.time, 10);
    const date = new Date(time);
    csv.analyzeTripsUpTo(date);
    res.json({ stations: csv.data.stations });
  }
});

app.get('/data/date_range', (req, res) => {
  if (!csv.data.isComplete) res.status(202).send('Analysis not complete');
  else {
    res.json({
      startTime: csv.data.trips
        .reduce((date, trip) => (date < trip.startTime ? date : trip.startTime))
        .getTime(),
      endTime: csv.data.trips
        .reduce((date, trip) => (date > trip.endTime ? date : trip.startTime))
        .getTime(),
    });
  }
});

app.get('/data/trips', (req, res) => {
  console.log('request to /data/trips');
  if (!csv.data.isComplete) res.status(202).send('Analysis not complete');
  else res.json(csv.data.trips);
});

app.get('/data/reset', (req, res) => {
  console.log('reset');
  csv.analyzeCSV();
  res.send('done');
});

csv.analyzeCSV().then(() => {
  app.listen(3000, () => console.log('Listening on port 3000'));
});
