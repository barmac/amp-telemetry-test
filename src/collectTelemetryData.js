import { getStreamInformation } from './getStreamInformation';

export function collectTelemetryData(player, options) {
  const telemetryData = {
    streamInformation: getStreamInformation(player),
  };

  return telemetryData;
}
