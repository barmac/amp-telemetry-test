class PlayerStatisticsRecorder {
  constructor() {
    this.reset();
  }

  getBufferingTime() {
    if (this.bufferingStart) {
      this.saveBufferingTime();
      this.bufferingStart = new Date();
    }

    const finalBufferTime = this.bufferingTime;
    this.reset();

    return finalBufferTime;
  }

  reset() {
    this.bufferingTime = 0;
  }

  startBuffering() {
    this.bufferingStart = new Date();
  }

  saveBufferingTime() {
    if (this.bufferingStart) {
      this.incrementBufferingTime()
      this.resetBufferingStart();
    }
  }

  incrementBufferingTime() {
    this.bufferingTime += new Date() - this.bufferingStart;
  }

  resetBufferingStart() {
    this.bufferingStart = undefined;
  }
}

export const playerStatisticsRecorder = new PlayerStatisticsRecorder();
