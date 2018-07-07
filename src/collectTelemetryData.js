import { getManifestUrl } from './getManifestUrl';
import { getProtocol } from './getProtocol';

export function collectTelemetryData(player, options) {
    var telemetryData = {
    streamInformation: {},
  };

  telemetryData.streamInformation.manifestUrl = getManifestUrl(player);
  telemetryData.streamInformation.protocol = getProtocol(player);

  return telemetryData;
}
