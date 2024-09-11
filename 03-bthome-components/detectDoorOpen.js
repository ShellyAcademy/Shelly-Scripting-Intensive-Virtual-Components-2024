const doorSensorOpenVC = "bthomesensor:206"
const doorSensorIlluminanceVC = "bthomesensor:205"
const doorSensorRotationVC = "bthomesensor:207"

Shelly.addStatusHandler(function(eventData) {
  if (typeof eventData.component != "undefined")
    if (eventData.component === doorSensorOpenVC) {
      let isDoorOpen = eventData.delta.value;
      console.log("door open:", isDoorOpen);
      if (isDoorOpen) {
        let illuminance = Shelly.getComponentStatus(doorSensorIlluminanceVC).value;
        console.log("Door was open and illuminance is",illuminance,"lux");
      }
    } else if (eventData.component === doorSensorRotationVC && 
               typeof eventData.delta.value != "undefined") {
      let degrees = eventData.delta.value;
      console.log("Door rotated with", degrees, " degrees");
    }
})