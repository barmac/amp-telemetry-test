export class StreamHistoryRecorder {
  constructor(player) {
    this.player = player;
    this.reset();
  }

  init() {
    this.player.addEventListener('playbackbitratechanged', () => this.recordBitrateChange() );

    const videoBufferData = this.player.videoBufferData();
    videoBufferData.addEventListener('downloadcompleted', () => this.recordVideoDownloadCompleted(videoBufferData.downloadCompleted));
    videoBufferData.addEventListener('downloadfailed', () => this.recordVideoDownloadFailed(videoBufferData.downloadFailed));

    const audioBufferData = this.player.audioBufferData();
    audioBufferData.addEventListener('downloadcompleted', () => this.recordAudioDownloadCompleted(audioBufferData.downloadCompleted));
    audioBufferData.addEventListener('downloadfailed', () => this.recordAudioDownloadFailed(audioBufferData.downloadFailed));
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
    return streamHistory;
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
  }

  reset() {
    this.bitrateChanges = [];
    this.audioDownloadsCompleted = {};
    this.audioDownloadsFailed = {};
    this.videoDownloadsCompleted = {};
    this.videoDownloadsFailed = {};
  }
}
