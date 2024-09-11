const MOTION_SENSOR_BTC = "bthomesensor:204";
const ILLUMINANCE_SENSOR_BTC = "bthomesensor:203";

function calculateBrightness(luminance) {
    if (luminance <= 100) {
        return 100 - 0.2 * luminance;
    } else if (luminance <= 500) {
        return 80 - 20 * Math.pow((luminance - 100) / 400, 1.5);
    } else if (luminance <= 1000) {
        return 60 - 60 * Math.pow((luminance - 500) / 500, 2);
    } else {
        return 0;
    }
}

Shelly.addStatusHandler(function(eventData){
  if (typeof eventData.component != "undefined" &&
      eventData.component === MOTION_SENSOR_BTC) {
    let motion = eventData.delta.value;
    if (motion) {
      let illuminance = Shelly.getComponentStatus(ILLUMINANCE_SENSOR_BTC).value;
      console.log("illuminance",illuminance);
      let brightness = Math.round(calculateBrightness(illuminance));
      console.log("brightness:",brightness);
      // threshold to totally turn off the lights
      if (brightness > 5) {
        Shelly.call("Light.Set", {id:0, on:true, brightness: brightness});
      } else {
        Shelly.call("Light.Set", {id:0, on:false});
      }
    } else {
      Shelly.call("Light.Set", {id:0, on:false});
    }
  }
});