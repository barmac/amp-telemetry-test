import { getAvailableAudioTracks } from './getAvailableAudioTracks';
import { getAvailableVideoTracks } from './getAvailableVideoTracks';
import { getManifestUrl } from './getManifestUrl';
import { getProtocol } from './getProtocol';
import { getStreamType } from './getStreamType';
import { getSubtitles } from  './getSubtitles';

export function getStreamInformation(player) {
  const streamInformation = {};

  streamInformation.availableAudioTracks = getAvailableAudioTracks(player);
  streamInformation.availableVideoTracks = getAvailableVideoTracks(player);
  streamInformation.manifestUrl = getManifestUrl(player);
  streamInformation.protocol = getProtocol(player);
  streamInformation.streamType = getStreamType(player);
  streamInformation.subtitles = getSubtitles(player);

  return streamInformation;
}