export function getAvailableVideoTracks(player) {
  const videoStreamList = player.currentVideoStreamList();

  if (!videoStreamList) {
    return [];
  }

  const availableVideoTracks = videoStreamList.streams.map(getTracks)
    .reduce(flattenNestedArray, [])
    .map(getVideoTrackData);

  return availableVideoTracks;
}

function getTracks({ tracks }) {
  return tracks;
}

function flattenNestedArray(currentArray, nestedArray) {
  return [...currentArray, ...nestedArray];
}

function getVideoTrackData({ bitrate, height, width }) {
  return { bitrate, height, width };
}
