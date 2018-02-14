import * as constants from 'js/api/constants';

function deserializeTimeRange(data) {
  return {
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
  };
}

export function fetchDateRange() {
  return fetch(constants.HISTORICAL_TIME_RANGE_URL)
    .then(res => res.json())
    .then(res => deserializeTimeRange(res));
}

export function filterStations(stations) {
  return stations.filter(
    station =>
      station.lat > 40 &&
      station.lat < 41 &&
      station.lon > -75 &&
      station.lon < -73.8,
  );
}
