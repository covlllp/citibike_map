export class Trip {
  constructor({ id, duration, startStation, endStation, startTime, endTime }) {
    this.id = id;
    this.duration = duration;
    this.startStation = startStation;
    this.endStation = endStation;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
