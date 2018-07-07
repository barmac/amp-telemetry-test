import { getManifestUrl } from './getManifestUrl';
import { getProtocol } from './getProtocol';
import { getAvailableAudioTracks } from './getAvailableAudioTracks';
import { getAvailableVideoTracks } from './getAvailableVideoTracks';
import { getSubtitles } from  './getSubtitles';
import { getStreamType } from './getStreamType';


export function collectTelemetryData(player, options) {
    var telemetryData = {
    streamInformation: {},
  };

  telemetryData.streamInformation.manifestUrl = getManifestUrl(player);
  telemetryData.streamInformation.protocol = getProtocol(player);
  telemetryData.streamInformation.availableAudioTracks = getAvailableAudioTracks(player);
  telemetryData.streamInformation.availableVideoTracks = getAvailableVideoTracks(player);
  telemetryData.streamInformation.subtitles = getSubtitles(player);
  telemetryData.streamInformation.streamType = getStreamType(player);

  return telemetryData;
}