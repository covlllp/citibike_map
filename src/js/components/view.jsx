/* global Plotly:true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createPlotlyComponent from 'react-plotly.js/factory';

import { Station } from 'js/types';

const Plot = createPlotlyComponent(Plotly);

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newIds: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const currentStations = Station.getStationList(this.props.stations);
    if (!currentStations.length) return;
    const newIds = Station.findNewStations(
      this.props.stations,
      nextProps.stations,
    );
    if (newIds.length) this.setState({ newIds });
  }

  render() {
    const stationList = Station.getStationList(this.props.stations);
    const data = Station.getPlotlyStations(
      stationList,
      this.state.newIds,
      this.props.viewType,
    );

    const config = {
      staticPlot: true,
    };

    const layout = {
      title: this.props.title,
      showlegend: false,
      xaxis: {
        visible: false,
        scaleanchor: 'y',
      },
      yaxis: {
        visible: false,
      },
      autosize: true,
    };

    return (
      <Plot
        className="plot-view"
        data={data}
        layout={layout}
        config={config}
        useResizeHandler
      />
    );
  }
}

View.defaultProps = {
  title: 'Map',
  viewType: 'diff',
};

View.propTypes = {
  stations: PropTypes.objectOf(PropTypes.instanceOf(Station)).isRequired,
  title: PropTypes.string,
  viewType: PropTypes.oneOf(['diff', 'size']),
};
