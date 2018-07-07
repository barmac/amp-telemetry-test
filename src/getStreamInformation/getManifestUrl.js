export function getManifestUrl(player) {
  var currentSrc = player.currentSrc();
  var manifestUrl = currentSrc.split('(format=')[0];

  return manifestUrl;
}
