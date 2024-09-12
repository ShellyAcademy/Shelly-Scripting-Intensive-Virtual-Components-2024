let CONFIG = {
    HUE_BRIDGE_IP: "192.168.0.15",
    HUE_USER: "eampuuwAtPSgj7yLi8VbDrhRw46EUGP2U6tdqUo5",
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
  
  
  let hueButton = Virtual.getHandle(CONFIG.HUE_BUTTON_VC);
  
  hueButton.on("single_push", function(e) {
    turnLights(true);
  });
  
  hueButton.on("double_push", function(e) {
    turnLights(false);
  });