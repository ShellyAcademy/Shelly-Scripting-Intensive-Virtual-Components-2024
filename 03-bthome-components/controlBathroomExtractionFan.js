let HUMIDITY_BTC = "bthomesensor:201"
let HTBUTTON_BTC = "bthomesensor:203"
let HUMIDITY_THRESHOLD_VC = "number:200"

Shelly.addEventHandler(function(eventData){
  if (typeof eventData.component != "undefined" &&
      eventData.component == HTBUTTON_BTC && eventData.info.event === "single_push") {
    Shelly.call("Switch.Toggle", {id:0});
  }
});

Shelly.addStatusHandler(function(eventData){
  if (typeof eventData.component != "undefined" &&
      (eventData.component === HUMIDITY_BTC || 
       eventData.component === HUMIDITY_THRESHOLD_VC)) {
    let humidity = Shelly.getComponentStatus(HUMIDITY_BTC).value;
    let humidityThreshold = Shelly.getComponentStatus(HUMIDITY_THRESHOLD_VC).value;
    
    if (humidity > humidityThreshold) {
      // turn on the fan
      Shelly.call("Switch.Set", {id:0, on:true});
    } else {
      Shelly.call("Switch.Set", {id:0, on:false});
    }
  }
});