import { createActions } from 'redux-actions';

import * as LiveApi from 'js/api/live';
import * as HistoricalApi from 'js/api/historical';

export const Actions = {
  STATION_INFO_FETCH: 'STATION_INFO_FETCH',
  STATION_INFO_SUCCESS: 'STATION_INFO_SUCCESS',
  STATION_INFO_ERROR: 'STATION_INFO_ERROR',
  STATION_STATUS_FETCH: 'STATION_STATUS_FETCH',
  STATION_STATUS_SUCCESS: 'STATION_STATUS_SUCCESS',
  STATION_STATUS_ERROR: 'STATION_STATUS_ERROR',

  HISTORICAL_RANGE_FETCH: 'HISTORICAL_RANGE_FETCH',
  HISTORICAL_RANGE_SUCCESS: 'HISTORICAL_RANGE_SUCCESS',
  HISTORICAL_RANGE_ERROR: 'HISTORICAL_RANGE_ERROR',
  HISTORICAL_STATION_AT_TIME_FETCH: 'HISTORICAL_STATION_AT_TIME_FETCH',
  HISTORICAL_STATION_AT_TIME_SUCCESS: 'HISTORICAL_STATION_AT_TIME_SUCCESS',
  HISTORICAL_STATION_AT_TIME_ERROR: 'HISTORICAL_STATION_AT_TIME_ERROR',
};

export const actionCreators = createActions(...Object.values(Actions));

export function fetchStationInfo() {
  return dispatch => {
    dispatch(actionCreators.stationInfoFetch());
    return LiveApi.fetchStationInfo()
      .then(data => {
        dispatch(actionCreators.stationInfoSuccess(data));
      })
      .catch(err => {
        dispatch(actionCreators.stationInfoError(err));
      });
  };
}

export function fetchStationStatus() {
  return dispatch => {
    dispatch(actionCreators.stationStatusFetch());
    return LiveApi.fetchStationStatus()
      .then(data => {
        dispatch(actionCreators.stationStatusSuccess(data));
      })
      .catch(err => {
        dispatch(actionCreators.stationStatusError(err));
      });
  };
}

export function fetchDateRange() {
  return dispatch => {
    dispatch(actionCreators.historicalRangeFetch());
    return HistoricalApi.fetchDateRange()
      .then(data => {
        dispatch(actionCreators.historicalRangeSuccess(data));
      })
      .catch(err => {
        dispatch(actionCreators.historicalRangeError(err));
      });
  };
}

export function fetchStationsAt(time) {
  return dispatch => {
    dispatch(actionCreators.historicalStationAtTimeFetch());
    return HistoricalApi.fetchStationsAt(time)
      .then(data => {
        dispatch(actionCreators.historicalStationAtTimeSuccess(data));
      })
      .catch(err => {
        dispatch(actionCreators.historicalStationAtTimeError(err));
      });
  };
}
