export function getStreamType(player) {
  return player.isLive() ? 'live' : 'on demand';
}