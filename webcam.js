Webcam = {
  _inMotion: false,
  _inMotionDep: new Tracker.Dependency,
  Stream: Stream
};

Object.defineProperty(Webcam, 'isDetectingMotion', {
  get: function() {
    this._inMotionDep.depend();
    return this._inMotion;
  },
  set: function(newValue) {
    this._inMotion = newValue;
    this._inMotionDep.changed();
  }
});
