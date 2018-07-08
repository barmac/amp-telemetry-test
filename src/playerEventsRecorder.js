const playerEvents = [
  'pause',
  'skip',
  'play',
  'waiting',
  'fullscreenchange',
  'volumechange',
  'ended',
];

export class PlayerEventsRecorder {

  constructor(player) {
    this.player = player;
  }

  init() {
    this.reset();

    playerEvents.forEach(event => this.player.addEventListener(event, () => {
      const playerEvent = { event, timestamp: new Date() };
      this.playerEvents.push(playerEvent);
    }));
  }

  getPlayerEvents() {
    const recordedEvents = [...this.playerEvents];

    this.reset();
    return recordedEvents;
  }

  reset() {
    this.playerEvents = [];
  }
}
