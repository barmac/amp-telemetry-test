export class PlayerErrorsRecorder {

  constructor(player) {
    this.player = player;
  }

  init() {
    this.reset();

    this.player.addEventListener('error', () => this.recordPlayerError());
  }

  getPlayerErrors() {
    const recordedErrors = [...this.playerErrors];

    this.reset();
    return recordedErrors;
  }

  recordPlayerError() {
    this.getPlayerError()
    const { code } = this.player.error();

    this.playerErrors.push({
      errorId: code,
      timestamp: new Date(),
    });
  }

  reset() {
    this.playerErrors = [];
  }
}
