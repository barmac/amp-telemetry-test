export function getAvailableAudioTracks(player) {
  const audioStreamList = player.currentAudioStreamList();

  if (!audioStreamList) {
    return [];
  }

  const availableAudioTracks = audioStreamList.streams.map(getAudioBitrateData);

  return availableAudioTracks;
}

function getAudioBitrateData({ bitrate }) {
  return { bitrate };
}
