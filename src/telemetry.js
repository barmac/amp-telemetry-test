import { getStreamInformation } from './getStreamInformation';
import { sendTelemetryData } from './sendTelemetryData';


(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 30000;
    const player = this;
    let collectedData = {};

    if (!options) {
      options = {};
    }

    const flushCollectedData = function() {
      collectedData = {};
    }

    const collectAndSendTelemetryData = function() {
      collectedData.streamInformation = getStreamInformation(player);

      sendTelemetryData(collectedData);
      flushCollectedData();
    }

    const init = function () {
      setInterval(collectAndSendTelemetryData, options.interval || defaultInterval);
    }

    init();
  });
}).call(this);
