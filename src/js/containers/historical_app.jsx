import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ApiStatus } from 'js/api/constants';
import { fetchDateRange, fetchStationsAt } from 'js/data/actions';
import { View } from 'js/components/view';
import { TIME_DELTA, REFRESH_RATE } from 'js/constants';
import { Station } from 'js/types/station';

class HistoricalApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTime: undefined,
    };
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.props.fetchDateRange();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dateRange.startTime && nextProps.dateRange.startTime) {
      this.setState({ viewTime: nextProps.dateRange.startTime.getTime() });
    }
    if (
      nextProps.apiHistoricalStationAtTimeStatus === ApiStatus.Success &&
      this.props.apiHistoricalStationAtTimeStatus !== ApiStatus.Success
    ) {
      this.timeout = setTimeout(this.updateTime, REFRESH_RATE);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.viewTime !== prevState.viewTime) {
      this.props.fetchStationsAt(this.state.viewTime);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  updateTime() {
    this.setState({ viewTime: this.state.viewTime + TIME_DELTA });
  }

  render() {
    return (
      <View
        stations={this.props.stations}
        title={new Date(this.state.viewTime).toString()}
        viewType="size"
      />
    );
  }
}

HistoricalApp.defaultProps = {
  dateRange: {},
  apiHistoricalStationAtTimeStatus: '',
};

HistoricalApp.propTypes = {
  fetchDateRange: PropTypes.func.isRequired,
  fetchStationsAt: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
  }),
  stations: PropTypes.objectOf(PropTypes.instanceOf(Station)).isRequired,
  apiHistoricalStationAtTimeStatus: PropTypes.string,
};

const mapStateToProps = state => {
  const { stationsAtTime } = state;
  const stations = {};
  if (stationsAtTime) {
    stationsAtTime.forEach(station => {
      stations[station.id] = new Station(station);
    });
  }
  return {
    dateRange: state.historicalRange,
    apiHistoricalStationAtTimeStatus: state.apiHistoricalStationAtTimeStatus,
    stations,
  };
};

const mapDispatchToProps = {
  fetchDateRange,
  fetchStationsAt,
};

const connectedHistoricalApp = connect(mapStateToProps, mapDispatchToProps)(
  HistoricalApp,
);

export { connectedHistoricalApp as HistoricalApp };
