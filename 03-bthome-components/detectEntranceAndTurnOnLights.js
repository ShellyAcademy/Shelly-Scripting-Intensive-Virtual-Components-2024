let DOOR_SENSOR_BTC = "bthomesensor:208";
let ILLUMINANCE_SENSOR_BTC = "bthomesensor:207";
let ROTATION_SENSOR_BTC = "bthomesensor:209";
let MOTION_SENSOR_BTC = "bthomesensor:204";
let BUTTON_BTC = "bthomesensor:201"

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
      (eventData.component === DOOR_SENSOR_BTC ||
       eventData.component === ROTATION_SENSOR_BTC)) {
    let isDoorOpen = Shelly.getComponentStatus(DOOR_SENSOR_BTC).value;
    let rotation = Shelly.getComponentStatus(ROTATION_SENSOR_BTC).value;
    console.log("isDoorOpen:", isDoorOpen,", rotation:", rotation);
    if (isDoorOpen && rotation > 45) {
      console.log("Door is open");
      let motion = Shelly.getComponentStatus(MOTION_SENSOR_BTC).value;
      if (motion) {
        console.log("Motion is detected outside, turning on the lights");
        let illuminance = Shelly.getComponentStatus(ILLUMINANCE_SENSOR_BTC).value;
        let brightness = Math.round(calculateBrightness(illuminance));
        Shelly.call("Light.Set", {id:0, on:true, brightness: brightness});
      }
    }
  }
});

Shelly.addEventHandler(function(eventData) {
  if (typeof eventData.component != "undefined" &&
      eventData.component === BUTTON_BTC) {
    Shelly.call("Light.Toggle", {id:0});
  }
})