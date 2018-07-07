export function getPlayerError(player) {
  const { code } = player.error();
  return {
    errorId: code,
    timestamp: new Date(),
  };
}
