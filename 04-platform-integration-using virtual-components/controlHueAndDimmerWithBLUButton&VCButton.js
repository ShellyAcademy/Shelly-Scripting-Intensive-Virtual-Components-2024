let CONFIG = {
    HUE_BRIDGE_IP: "192.168.0.15",
    HUE_USER: "eampuuwAtPSgj7yLi8VbDrhRw46EUGP2U6tdqUo5",
    BLU_BUTTON_BTC: "bthomesensor:214",
    HUE_BUTTON_VC: "button:200",
    HUE_LIGHTS: [1, 2, 3],
    DIMMER_LIGHTS: [0]
  }
  
  function turnLights(on) {
    for (hueLight of CONFIG.HUE_LIGHTS) {
      let url = "http://" + CONFIG.HUE_BRIDGE_IP + "/api/" + CONFIG.HUE_USER + 
                "/lights/" + hueLight + "/state";
      let body = {
        on: on
      }
      Shelly.call("HTTP.Request", { url: url, method: "PUT", body: body});
    }
    
    for (dimmerLight of CONFIG.DIMMER_LIGHTS) {
      Shelly.call("Light.Set", {id: dimmerLight, on: on});
    }
  }
  
  Shelly.addEventHandler(function(eventData) {
    if (typeof eventData.component != "undefined" &&
        (eventData.component === CONFIG.BLU_BUTTON_BTC ||
         eventData.component === CONFIG.HUE_BUTTON_VC)) {
      if (eventData.info.event === "single_push") {
        turnLights(true);
      } else if (eventData.info.event === "double_push") {
        turnLights(false);
      }
    }
  });