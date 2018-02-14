import csv from 'csvtojson';
import path from 'path';

import * as TripUtils from './trips';

const csvFilePath = path.join(
  __dirname,
  '..',
  '..',
  'data',
  '201708-citibike-tripdata.csv',
);

export const data = {
  stations: {}, // id: num, lat: num, lon: num
  trips: [],
  isComplete: false,
};

function analyzeRow(row) {
  TripUtils.analyzeTrips(row, data);
}

export function analyzeCSV() {
  return new Promise((resolve, reject) => {
    const now = Date.now();
    // eslint-disable-next-line no-console
    console.log('analysis starting');
    csv()
      .fromFile(csvFilePath)
      .on('json', jsonObj => {
        analyzeRow(jsonObj);
      })
      .on('done', err => {
        TripUtils.initializeDataForAnalysis(data);
        // eslint-disable-next-line no-console
        console.log('analysis done');
        if (err) {
          reject(err);
        } else {
          data.isComplete = true;
          // eslint-disable-next-line no-console
          console.log(`analysis took ${Date.now() - now} milliseconds`);
          resolve();
        }
      });
  });
}

export function analyzeTripsUpTo(time) {
  TripUtils.analyzeTripsUpTo(time, data);
}
