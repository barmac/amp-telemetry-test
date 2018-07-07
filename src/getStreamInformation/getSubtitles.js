export function getSubtitles(player) {
  const textTracks = player.textTracks();

  if (!textTracks.length) {
    return [];
  }

  return textTracks.map(getTrackData);
}

function getTrackData({ label, srclang }) {
  return { label, srclang };
}
