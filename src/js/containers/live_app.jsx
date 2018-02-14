import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from 'js/components/view';
import { fetchStationInfo, fetchStationStatus } from 'js/data/actions';
import { REFRESH_RATE } from 'js/constants';
import { Station } from 'js/types/station';

class LiveApp extends Component {
  componentDidMount() {
    this.props.fetchStationInfo();
    this.props.fetchStationStatus();

    this.interval = setInterval(this.props.fetchStationStatus, REFRESH_RATE);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return <View stations={this.props.stations} />;
  }
}

LiveApp.propTypes = {
  fetchStationInfo: PropTypes.func.isRequired,
  fetchStationStatus: PropTypes.func.isRequired,
  stations: PropTypes.objectOf(PropTypes.instanceOf(Station)).isRequired,
};

const mapStateToProps = state => {
  const stations = {};
  if (state.stationInfo && state.stationStatus) {
    state.stationInfo.forEach(station => {
      stations[station.id] = station;
    });
    state.stationStatus.forEach(status => {
      const station = stations[status.id];
      if (station) {
        stations[station.id] = new Station({ ...station, ...status });
      }
    });
  }
  return {
    stations,
  };
};

const mapDispatchToProps = {
  fetchStationInfo,
  fetchStationStatus,
};

const connectedLiveApp = connect(mapStateToProps, mapDispatchToProps)(LiveApp);

export { connectedLiveApp as LiveApp };
