/* eslint-disable no-param-reassign */
// data.stations = {}, id: num, lat: num, lon: num

function addStation(station, data) {
  if (data.stations[station.id]) return;
  data.stations[station.id] = station;
}

function getStartStation(row) {
  return {
    id: parseInt(row['start station id'], 10),
    lat: parseFloat(row['start station latitude']),
    lon: parseFloat(row['start station longitude']),
    capacity: 0,
    bikes: 0,
    startBikes: 0,
  };
}

function getEndStation(row) {
  return {
    id: parseInt(row['end station id'], 10),
    lat: parseFloat(row['end station latitude']),
    lon: parseFloat(row['end station longitude']),
    capacity: 0,
    bikes: 0,
    startBikes: 0,
  };
}

export function analyzeStations(row, data) {
  addStation(getStartStation(row), data);
  addStation(getEndStation(row), data);
}
