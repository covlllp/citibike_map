import { handleActions } from 'redux-actions';

import { ApiStatus } from 'js/api/constants';
import { Actions } from 'js/data/actions';

const actionMap = {};

// Station Info Fetch
actionMap[Actions.STATION_INFO_FETCH] = state => ({
  ...state,
  apiStationInfoStatus: ApiStatus.Fetch,
});
actionMap[Actions.STATION_INFO_SUCCESS] = (state, action) => ({
  ...state,
  apiStationInfoStatus: ApiStatus.Success,
  stationInfo: action.payload,
});
actionMap[Actions.STATION_INFO_ERROR] = (state, action) => ({
  ...state,
  apiStationInfoStatus: ApiStatus.Error,
  error: action.payload,
});

// Station Status Fetch
actionMap[Actions.STATION_STATUS_FETCH] = state => ({
  ...state,
  apiStationStatusStatus: ApiStatus.Fetch,
});
actionMap[Actions.STATION_STATUS_SUCCESS] = (state, action) => ({
  ...state,
  apiStationStatusStatus: ApiStatus.Success,
  stationStatus: action.payload,
});
actionMap[Actions.STATION_STATUS_ERROR] = (state, action) => ({
  ...state,
  apiStationStatusStatus: ApiStatus.Error,
  error: action.payload,
});

// Historical Range Fetch
actionMap[Actions.HISTORICAL_RANGE_FETCH] = state => ({
  ...state,
  apiHistoricalRangeStatus: ApiStatus.Fetch,
});
actionMap[Actions.HISTORICAL_RANGE_SUCCESS] = (state, action) => ({
  ...state,
  apiHistoricalRangeStatus: ApiStatus.Success,
  historicalRange: action.payload,
});
actionMap[Actions.HISTORICAL_RANGE_ERROR] = (state, action) => ({
  ...state,
  apiHistoricalRangeStatus: ApiStatus.Error,
  error: action.payload,
});

// Historical Range Fetch
actionMap[Actions.HISTORICAL_STATION_AT_TIME_FETCH] = state => ({
  ...state,
  apiHistoricalStationAtTimeStatus: ApiStatus.Fetch,
});
actionMap[Actions.HISTORICAL_STATION_AT_TIME_SUCCESS] = (state, action) => ({
  ...state,
  apiHistoricalStationAtTimeStatus: ApiStatus.Success,
  stationsAtTime: action.payload,
});
actionMap[Actions.HISTORICAL_STATION_AT_TIME_ERROR] = (state, action) => ({
  ...state,
  apiHistoricalStationAtTimeStatus: ApiStatus.Error,
  error: action.payload,
});

// Trip Fetch
actionMap[Actions.TRIPS_AT_TIME_FETCH] = state => ({
  ...state,
  apiTripsAtTimeStatus: ApiStatus.Fetch,
});
actionMap[Actions.TRIPS_AT_TIME_SUCCESS] = (state, action) => ({
  ...state,
  apiTripsAtTimeStatus: ApiStatus.Success,
  trips: action.payload,
});
actionMap[Actions.TRIPS_AT_TIME_ERROR] = (state, action) => ({
  ...state,
  apiTripsAtTimeStatus: ApiStatus.Error,
  error: action.payload,
});

export const reducer = handleActions(actionMap, {});
