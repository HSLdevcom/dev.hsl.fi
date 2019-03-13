---
title: "HFP"
documentation:
  - title: "HFP documentation"
    url: "https://digitransit.fi/en/developers/apis/4-realtime-api/vehicle-positions/"
endpoints:
  - title: "MQTT"
    url: "mqtts://mqtt.hsl.fi:8883/"
  - title: "MQTT-over-WebSocket"
    url: "wss://mqtt.hsl.fi:443/"
---

The open HFP API can be used to subscribe to vehicle movements in soft real time.

Most of the vehicles in the HSL area should publish their status, including their position, once per second. The devices of the end users, e.g. smartphones, may subscribe to receive the relevant messages based on their context, e.g. filtered on the mode of transport, the route ID, the geographical region etc. The subscription scope is specified by the MQTT topic structure of the API.
