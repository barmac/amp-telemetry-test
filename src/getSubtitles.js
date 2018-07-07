export function getSubtitles(player) {
  const textTracks = player.textTracks();

  return textTracks.map(getTrackData);
}

function getTrackData({ label, srclang }) {
  return { label, srclang };
}
