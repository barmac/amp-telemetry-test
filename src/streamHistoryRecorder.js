class StreamHistoryRecorder {
  constructor() {
    this.reset();
  }

  getStreamHistory() {
    const streamHistory = {
      bitrateChanges: this.bitrateChanges,
      audioDownloadsCompleted: this.audioDownloadsCompleted,
      audioDownloadsFailed: this.audioDownloadsFailed,
      videoDownloadsCompleted: this.videoDownloadsCompleted,
      videoDownloadsFailed: this.videoDownloadsFailed,
    };

    this.reset();
    return streamHistory
  }

  recordBitrateChange() {
    this.bitrateChanges.push({ timestamp: new Date() });
  }

  recordAudioDownloadCompleted(downloadData) {
    const bitrate = this.getBitrate(downloadData);
    const { totalBytes } = downloadData;

    this.addDownloadCompletionForBitrate(this.audioDownloadsCompleted, bitrate, totalBytes);
  }

  recordAudioDownloadFailed(downloadData) {
    const bitrate = this.getBitrate(downloadData);

    this.incrementDownloadFailuresForBitrate(this.audioDownloadsFailed, bitrate);
  }

  recordVideoDownloadCompleted(downloadData) {
    const bitrate = this.getBitrate(downloadData);
    const { totalBytes } = downloadData;

    this.addDownloadCompletionForBitrate(this.videoDownloadsCompleted, bitrate, totalBytes);
  }

  recordVideoDownloadFailed(downloadData) {
    const bitrate = this.getBitrate(downloadData);

    this.incrementDownloadFailuresForBitrate(this.videoDownloadsFailed, bitrate);
  }

  getBitrate(downloadData) {
    return downloadData.mediaDownload.bitrate;
  }

  addDownloadCompletionForBitrate(completionsContainer, bitrate, totalBytes) {
    if (completionsContainer[bitrate]) {
      completionsContainer[bitrate].push(totalBytes);
    } else {
      completionsContainer[bitrate] = [totalBytes];
    }
  }

  incrementDownloadFailuresForBitrate(failuresContainer, bitrate) {
    if (failuresContainer[bitrate]) {
      failuresContainer[bitrate] += 1;
    } else {
      failuresContainer[bitrate] = 1;
    }

    console.log(this.failuresContainer, this.audioDownloadsCompleted, this.videoDownloadsCompleted);
  }

  reset() {
    this.bitrateChanges = [];
    this.audioDownloadsCompleted = {};
    this.audioDownloadsFailed = {};
    this.videoDownloadsCompleted = {};
    this.videoDownloadsFailed = {};
  }
}

export const streamHistoryRecorder = new StreamHistoryRecorder();
