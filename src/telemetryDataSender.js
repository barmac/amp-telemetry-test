export class TelemetryDataSender {
  constructor(url) {
    this.fetch = fetch;

    this.url = url;
    if (!this.url) {
      console.log('No url provided, sending data to console');
    }
  }

  sendData(data) {
    if (this.url) {
      this.sendRequest(data)
        .catch(console.error);
    } else {
      console.log('Telemetry data: ', data);
    }
  }

  sendRequest(data) {
    return this.fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });
  }
}