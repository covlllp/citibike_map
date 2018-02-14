import * as constants from 'js/api/constants';

function deserializeTimeRange(data) {
  return {
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
  };
}

function deserializeStation(station) {
  return {
    lat: station.lat,
    lon: station.lon,
    capacity: station.capacity,
    bikesAvailable: station.bikes,
    docksAvailable: station.capacity - station.bikes,
    id: station.id,
  };
}

export function fetchDateRange() {
  return fetch(constants.HISTORICAL_TIME_RANGE_URL)
    .then(res => res.json())
    .then(res => deserializeTimeRange(res));
}

export function fetchStationsAt(time) {
  const timeNum = time instanceof Date ? time.getTime() : time;
  return fetch(constants.STATION_STATUS_AT_TIME + timeNum)
    .then(res => res.json())
    .then(res =>
      Object.values(res.stations)
        .map(station => deserializeStation(station))
        .filter(
          station =>
            station.lat > 35 &&
            station.lat < 45 &&
            station.lon > -75 &&
            station.lon < -70,
        ),
    );
}
