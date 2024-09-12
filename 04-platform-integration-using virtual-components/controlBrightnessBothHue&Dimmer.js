let CONFIG = {
    HUE_BRIDGE_IP: "192.168.0.15",
    HUE_USER: "eampuuwAtPSgj7yLi8VbDrhRw46EUGP2U6tdqUo5",
    BRIGHTNESS_VC: "number:200",
    HUE_LIGHTS: [1, 2, 3],
    DIMMER_LIGHTS: [0, 1]
  }
  
  let brightnessSlider = Virtual.getHandle(CONFIG.BRIGHTNESS_VC);
  
  brightnessSlider.on("change", function(eventData) {
    let brightness = Math.round(eventData.value * 2.54);
    for (hueLight of CONFIG.HUE_LIGHTS) {
      let url = "http://" + CONFIG.HUE_BRIDGE_IP + "/api/" + CONFIG.HUE_USER +
                "/lights/" + hueLight + "/state";
      let body = {
        "on": true,
        "bri": brightness
      }
      Shelly.call("HTTP.Request", {url:url, method: "PUT", body:body});
    }
    
    for (dimmerLight of CONFIG.DIMMER_LIGHTS) {
      Shelly.call("Light.Set", {id: dimmerLight, on: true, brightness: eventData.value});
    }
  });