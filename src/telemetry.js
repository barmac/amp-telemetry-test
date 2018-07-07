import { getPlayerError } from './getPlayerError';
import { getStreamInformation } from './getStreamInformation';
import { sendTelemetryData } from './sendTelemetryData';

(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 3000;
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

      sendTelemetryData({ ...collectedData });
      flushCollectedData();
    }

    const init = function () {
      setInterval(collectAndSendTelemetryData, options.interval || defaultInterval);
      player.addEventListener('error', function() {
        const error = getPlayerError(player);
        collectedData.playerErrors.push(error);
      });
    }

    init();
  });
}).call(this);
