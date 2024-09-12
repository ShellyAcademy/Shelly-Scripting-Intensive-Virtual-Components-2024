const CONFIG = {
    MOTION_VC: "bthomesensor:210",
    DOOR_VC: "bthomesensor:206",
    TEMPERATURE_VC: "bthomesensor:203",
    HUMIDITY_VC: "bthomesensor:201",
    
    MESSAGE_VC_ID: 201,
    SPEAK_VC_ID: 200,
    PLAY_VIDEO_VC_ID: 201,
    
    BRIGHTNESS: 30,
    LIGHT_BRIGHTNESS_VC: "number:200"
  }
  
  let lightBrightnessVC = Virtual.getHandle(CONFIG.LIGHT_BRIGHTNESS_VC);
  
  function turnLightOn() {
    lightBrightnessVC.setValue(CONFIG.BRIGHTNESS);
  }
  
  function playWelcomeMessage() {
    let temperature = Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC).value;
    let humidity = Shelly.getComponentStatus(CONFIG.HUMIDITY_VC).value;
    let message = "Welcome home! The temperature is " + temperature + 
                  " degress and humidity is " + humidity + "%.";
    Shelly.call("Text.Set", {id:CONFIG.MESSAGE_VC_ID, value: message}, function(){
      Shelly.call("Button.Trigger", {id:CONFIG.SPEAK_VC_ID, event:"single_push"});
    });
  }
  
  function playWelcomeVideo() {
    Shelly.call("Button.Trigger", {id:CONFIG.PLAY_VIDEO_VC_ID, event:"single_push"});
  }
  
  Shelly.addStatusHandler(function(eventData){
    if (typeof eventData.component != "undefined" &&
        eventData.component === CONFIG.DOOR_VC && 
        typeof eventData.delta.value != "undefined") {
      let isOpen = eventData.delta.value;
      if (isOpen) {
        console.log("Door is open");
        let motion = Shelly.getComponentStatus(CONFIG.MOTION_VC).value;
        if (motion) {
          turnLightOn();
          playWelcomeMessage();
          playWelcomeVideo();
        }
      }
    }
  })