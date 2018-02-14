import * as constants from 'js/api/constants';

function deserializeTrip(trip) {
  return {
    id: trip.id,
    startStation: trip.startStation,
    endStation: trip.endStation,
    startTime: new Date(trip.startTime),
    endTime: new Date(trip.endTime),
    duration: trip.duration,
  };
}

export function fetchTripsBetween(startTime, endTime) {
  const startTimeNum =
    startTime instanceof Date ? startTime.getTime() : startTime;
  const endTimeNum = endTime instanceof Date ? endTime.getTime() : endTime;
  return fetch(`${constants.TRIP_RANGE_URL}${startTimeNum}/${endTimeNum}`)
    .then(res => res.json())
    .then(res => res.trips.map(trip => deserializeTrip(trip)));
}
