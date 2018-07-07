import { collectTelemetryData } from './collectTelemetryData';
import { sendTelemetryData } from './sendTelemetryData';

(function () {
  amp.plugin('telemetry', function (options) {
    var defaultInterval = 30000;
    var player = this;

    if (!options) {
      options = {};
    }

    var collectAndSendTelemetryData = function() {
      var data = collectTelemetryData(player, options);
      sendTelemetryData(data);
    }

    var init = function () {
      setInterval(collectAndSendTelemetryData, options.interval || defaultInterval);
    }

    init();
  });
}).call(this);
