import { getPlayerError } from './getPlayerError';
import { getStreamInformation } from './getStreamInformation';
import { sendTelemetryData } from './sendTelemetryData';
import { PlayerEventsRecorder } from './playerEventsRecorder';
import { PlayerStatisticsRecorder } from './playerStatisticsRecorder';
import { StreamHistoryRecorder } from './streamHistoryRecorder';

(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 3000;
    const player = this;
    const collectedData = {};
    const playerEventsRecorder = new PlayerEventsRecorder(player);
    const playerStatisticsRecorder = new PlayerStatisticsRecorder(player);
    const streamHistoryRecorder = new StreamHistoryRecorder(player);

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
      collectedData.playerEvents = playerEventsRecorder.getPlayerEvents();
      collectedData.playerStatistics = playerStatisticsRecorder.getPlayerStatistics();
      collectedData.streamHistory = streamHistoryRecorder.getStreamHistory();
      collectedData.streamInformation = getStreamInformation(player);

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

      playerEventsRecorder.init();
      playerStatisticsRecorder.init();

      player.addEventListener('loadedmetadata', function() {
        streamHistoryRecorder.init();
      });
    }

    init();
  });
}).call(this);
