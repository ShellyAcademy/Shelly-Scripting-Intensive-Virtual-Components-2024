const BRIGHTNESS_VC = "number:201"

Shelly.addStatusHandler(function(event) {
  if (typeof event.component != "undefined" && event.component===BRIGHTNESS_VC) {
    let value = event.delta.value;
    Shelly.call("Light.Set", {id:0, brightness: value});
    let url = "http://192.168.0.83/rpc/Number.Set?id=203&value=" + value;
    Shelly.call("HTTP.GET", {url: url});
  }
})