let BUTTON_BTC = "bthomesensor:201";

Shelly.addEventHandler(function(eventData) {
  if (typeof eventData.component != "undefined" &&
      eventData.component === BUTTON_BTC) {
    let event = eventData.info.event;
    if (event === "single_push") {
      // if we want to turn on a switch we can do
      // Shelly.call("Switch.set", {id:0, on:true});
      // or
      // Shelly.call("Switch.toggle", {id:0});
      // to toggle the switch
      Shelly.call("Light.Toggle", {id:0});
    } else if (event === "double_push") {
      let brightness = Shelly.getComponentStatus("light:0").brightness;
      // increase brightness with a step of 20
      brightness = brightness + 20;
      if (brightness > 100) brightness = 100;
      Shelly.call("Light.Set", {id:0, brightness: brightness});
    } else if (event === "triple_push") {
      let brightness = Shelly.getComponentStatus("light:0").brightness;
      // decrease brightness with a step of 20
      brightness = brightness - 20;
      if (brightness < 0) brightness = 0;
      Shelly.call("Light.Set", {id:0, brightness: brightness});
    } else if (event === "long_push") {
      Shelly.call("Light.Set", {id:0, brightness: 100});
    }
  }
});