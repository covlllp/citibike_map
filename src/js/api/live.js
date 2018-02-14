import * as constants from 'js/api/constants';

function deserializeStationInfo(info) {
  return {
    name: info.name,
    lat: info.lat,
    lon: info.lon,
    capacity: info.capacity,
    id: info.station_id,
  };
}

function deserializeStationInfoResponse(res) {
  return res.data.stations.map(info => deserializeStationInfo(info));
}

function deserializeStationStatus(status) {
  return {
    id: status.station_id,
    bikesAvailable: status.num_bikes_available,
    docksAvailable: status.num_docks_available,
  };
}

function deserializeStationStatusResponse(res) {
  return res.data.stations.map(status => deserializeStationStatus(status));
}

export function fetchStationInfo() {
  return fetch(constants.STATION_INFO_URL)
    .then(res => res.json())
    .then(res => deserializeStationInfoResponse(res));
}

export function fetchStationStatus() {
  return fetch(constants.STATION_STATUS_URL)
    .then(res => res.json())
    .then(res => deserializeStationStatusResponse(res));
}
