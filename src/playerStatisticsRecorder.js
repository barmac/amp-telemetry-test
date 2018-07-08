export class PlayerStatisticsRecorder {
  constructor(player) {
    this.player = player;
    this.reset();
  }

  init() {
    this.player.addEventListener('waiting', () => this.startBuffering());
    this.player.addEventListener('playing', () => this.saveBufferingTime());
  }

  getPlayerStatistics() {
    return {
      bufferingTime: this.getBufferingTime(),
    };
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
