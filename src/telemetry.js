import { collectTelemetryData } from './collectTelemetryData';
import { sendTelemetryData } from './sendTelemetryData';

(function () {
  amp.plugin('telemetry', function (options) {
    const defaultInterval = 30000;
    const player = this;

    if (!options) {
      options = {};
    }

    const collectAndSendTelemetryData = function() {
      const data = collectTelemetryData(player, options);
      sendTelemetryData(data);
    }

    const init = function () {
      setInterval(collectAndSendTelemetryData, options.interval || defaultInterval);
    }

    init();
  });
}).call(this);
