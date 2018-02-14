import React from 'react';
import { Route } from 'react-router-dom';

import { LiveApp } from 'js/containers/live_app';
import { HistoricalApp } from 'js/containers/historical_app';
import { TripApp } from 'js/containers/trip_app';

export const routes = [
  <Route exact path="/" component={HistoricalApp} key={0} />,
  <Route path="/live" component={LiveApp} key={1} />,
  <Route path="/historical" component={HistoricalApp} key={2} />,
  <Route path="/trip" component={TripApp} key={3} />,
];
