/* eslint-disable no-param-reassign,no-plusplus */
// data.trips = {}, id: num, startStation: num, endStation: num, startTime: Date, endTime: Date, duration: num

import { analyzeStations } from './stations';

const dateMin = new Date('2017-08-07');
const dateMax = new Date('2017-08-21');

let id = 0;

function checkTrip(trip) {
  return trip.startTime > dateMin && trip.endTime < dateMax;
}

function addTrip(trip, data) {
  data.trips.push(trip);
}

function getTrip(row) {
  // eslint-disable-next-line no-console
  if (!(id % 100000)) console.log('working...');
  return {
    id: ++id,
    duration: parseInt(row.tripduration, 10),
    startStation: parseInt(row['start station id'], 10),
    endStation: parseInt(row['end station id'], 10),
    startTime: new Date(row.starttime),
    endTime: new Date(row.stoptime),
  };
}

function analyzeTripStations(trip, data) {
  const { startStation: startStationId, endStation: endStationId } = trip;
  const startStation = data.stations[startStationId];
  if (startStation.bikes <= 0) {
    startStation.bikes++;
    startStation.capacity++;
    startStation.startBikes++;
  }

  const endStation = data.stations[endStationId];
  if (endStation.bikes === endStation.capacity) {
    endStation.capacity++;
  }
  startStation.bikes--;
  endStation.bikes++;
}

export function initializeDataForAnalysis(data) {
  Object.keys(data.stations).forEach(stationId => {
    const station = data.stations[stationId];
    station.bikes = station.startBikes;
  });
}

function analyzeTripStationsUpTo(time, data) {
  data.trips.forEach(trip => {
    if (trip.endTime > time) return;
    const { startStation: startStationId, endStation: endStationId } = trip;
    const startStation = data.stations[startStationId];
    startStation.bikes--;
    const endStation = data.stations[endStationId];
    endStation.bikes++;
  });
}

export function analyzeTrips(row, data) {
  const trip = getTrip(row);
  if (!checkTrip(trip)) return;
  analyzeStations(row, data);
  addTrip(trip, data);
  analyzeTripStations(trip, data);
}

export function analyzeTripsUpTo(time, data) {
  initializeDataForAnalysis(data);
  analyzeTripStationsUpTo(time, data);
}
