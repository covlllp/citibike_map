export class Station {
  constructor({
    name,
    lat,
    lon,
    capacity,
    id,
    bikesAvailable,
    docksAvailable,
  }) {
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.capacity = capacity;
    this.id = id;
    this.bikesAvailable = bikesAvailable;
    this.docksAvailable = docksAvailable;
  }

  get utility() {
    return this.docksAvailable / this.capacity;
  }

  static findNewStations(stationMap1, stationMap2) {
    const stations2 = Station.getStationList(stationMap2);
    const newIds = [];
    stations2.forEach(station => {
      const curStation = stationMap1[station.id];
      if (curStation && curStation.bikesAvailable !== station.bikesAvailable) {
        newIds.push(station.id);
      }
    });
    return newIds;
  }

  static getStationList(stationMap) {
    return Object.keys(stationMap).map(id => stationMap[id]);
  }

  static getPlotlyStations(stations, newIds, type) {
    const utilities = stations.map(station => station.utility);
    const size = utilities.map(utility => utility * 10);
    const color =
      type === 'diff'
        ? stations.map(station => (newIds.indexOf(station.id) < 0 ? 1 : 0))
        : utilities;
    return [
      {
        type: 'scatter',
        x: stations.map(station => station.lon),
        y: stations.map(station => station.lat),
        marker: {
          size,
          sizemin: 3,
          color,
          colorscale: [[0, 'red'], [1, 'blue']],
          cmin: 0,
          cmax: 1,
          showscale: true,
        },
        mode: 'markers',
      },
    ];
  }
}
