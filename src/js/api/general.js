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
