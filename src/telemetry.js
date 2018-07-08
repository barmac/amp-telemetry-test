import { getPlayerError } from './getPlayerError';
import { getStreamInformation } from './getStreamInformation';
import { playerStatisticsRecorder } from './playerStatisticsRecorder';
import { sendTelemetryData } from './sendTelemetryData';
import { streamHistoryRecorder } from './streamHistoryRecorder';

(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 3000;
    const playerEvents = [
      'pause',
      'skip',
      'play',
      'waiting',
      'fullscreenchange',
      'volumechange',
      'ended',
    ];
    const player = this;
    const collectedData = {};

    if (!options) {
      options = {};
    }

    const flushCollectedData = function() {
      collectedData.streamInformation = {};
      collectedData.streamHistory = {};
      collectedData.playerStatistics = {};
      collectedData.playerEvents = [];
      collectedData.playerErrors = [];
    }

    const collectAndSendTelemetryData = function() {
      collectedData.streamInformation = getStreamInformation(player);
      collectedData.playerStatistics = playerStatisticsRecorder.getPlayerStatistics();
      collectedData.streamHistory = streamHistoryRecorder.getStreamHistory();

      sendTelemetryData({ ...collectedData });
      flushCollectedData();
    }

    const init = function () {
      flushCollectedData();
      setInterval(collectAndSendTelemetryData, options.interval || defaultInterval);

      player.addEventListener('error', function() {
        const error = getPlayerError(player);
        collectedData.playerErrors.push(error);
      });
      playerEvents.forEach(event => player.addEventListener(event, function() {
        const playerEvent = { event, timestamp: new Date() };
        collectedData.playerEvents.push(playerEvent);
      }));

      player.addEventListener('waiting', function() { playerStatisticsRecorder.startBuffering() });
      player.addEventListener('playing', function() { playerStatisticsRecorder.saveBufferingTime() });

      player.addEventListener('playbackbitratechanged', function() { streamHistoryRecorder.recordBitrateChange() });
    }

    init();
  });
}).call(this);
