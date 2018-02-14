import * as constants from 'js/api/constants';
import { filterStations } from 'js/api/general';

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

export function fetchStationsAt(time) {
  const timeNum = time instanceof Date ? time.getTime() : time;
  return fetch(constants.STATION_STATUS_AT_TIME + timeNum)
    .then(res => res.json())
    .then(res =>
      Object.values(res.stations).map(station => deserializeStation(station)),
    )
    .then(filterStations);
}
