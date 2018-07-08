class StreamHistoryRecorder {
  constructor() {
    this.reset();
  }

  getStreamHistory() {
    return {
      bitrateChanges: this.bitrateChanges,
    };
  }

  recordBitrateChange() {
    this.bitrateChanges.push({ timestamp: new Date() });
  }

  reset() {
    this.bitrateChanges = [];
  }
}

export const streamHistoryRecorder = new StreamHistoryRecorder();
