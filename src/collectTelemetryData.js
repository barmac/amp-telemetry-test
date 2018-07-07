import { getManifestUrl } from './getManifestUrl';
import { getProtocol } from './getProtocol';
import { getAvailableAudioTracks } from './getAvailableAudioTracks';
import { getAvailableVideoTracks } from './getAvailableVideoTracks';


export function collectTelemetryData(player, options) {
    var telemetryData = {
    streamInformation: {},
  };

  telemetryData.streamInformation.manifestUrl = getManifestUrl(player);
  telemetryData.streamInformation.protocol = getProtocol(player);
  telemetryData.streamInformation.availableAudioTracks = getAvailableAudioTracks(player);
  telemetryData.streamInformation.availableVideoTracks = getAvailableVideoTracks(player);

  return telemetryData;
}
