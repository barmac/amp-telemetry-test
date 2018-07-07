
export function collectTelemetryData(player) {
  const telemetryData = {
    streamInformation: getStreamInformation(player),
  };

  return telemetryData;
}
