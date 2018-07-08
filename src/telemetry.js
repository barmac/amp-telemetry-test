import { getStreamInformation } from './getStreamInformation';
import { sendTelemetryData } from './sendTelemetryData';
import { PlayerErrorsRecorder } from './playerErrorsRecorder';
import { PlayerEventsRecorder } from './playerEventsRecorder';
import { PlayerStatisticsRecorder } from './playerStatisticsRecorder';
import { StreamHistoryRecorder } from './streamHistoryRecorder';

(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 3000;
    const player = this;
    const collectedData = {};
    const playerEventsRecorder = new PlayerEventsRecorder(player);
    const playerErrorsRecorder = new PlayerErrorsRecorder(player);
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
      collectedData.playerErrors = playerErrorsRecorder.getPlayerErrors();
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

      playerErrorsRecorder.init();
      playerEventsRecorder.init();
      playerStatisticsRecorder.init();

      player.addEventListener('loadedmetadata', function() {
        streamHistoryRecorder.init();
      });
    }

    init();
  });
}).call(this);
