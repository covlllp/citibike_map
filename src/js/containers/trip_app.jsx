import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDateRange, fetchTripsBetween } from 'js/data/actions';
import { Trip } from 'js/types/trip';

class TripApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTime: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchDateRange();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dateRange.startTime && nextProps.dateRange.startTime) {
      this.setState({ viewTime: nextProps.dateRange.startTime.getTime() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.viewTime !== prevState.viewTime) {
      this.props.fetchTripsBetween(
        this.state.viewTime,
        this.state.viewTime + 60 * 60 * 1000,
      );
    }
  }

  render() {
    return <div />;
  }
}

TripApp.defaultProps = {
  dateRange: {},
};

TripApp.propTypes = {
  fetchDateRange: PropTypes.func.isRequired,
  fetchTripsBetween: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    startTime: PropTypes.instanceOf(Date),
    endTime: PropTypes.instanceOf(Date),
  }),
};

const mapStateToProps = state => ({
  dateRange: state.historicalRange,
  trips: state.trips ? state.trips.map(trip => new Trip(trip)) : [],
});

const mapDispatchToProps = {
  fetchDateRange,
  fetchTripsBetween,
};

const connectedTripApp = connect(mapStateToProps, mapDispatchToProps)(TripApp);

export { connectedTripApp as TripApp };
