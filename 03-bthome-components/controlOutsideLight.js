let MOTION_BTC = "bthomesensor:211";

Shelly.addStatusHandler(function(eventData){
  if (typeof eventData.component != "undefined" &&
      eventData.component === MOTION_BTC) {
    let motion = eventData.delta.value;
    if (motion) {
      Shelly.call("Switch.Set", {id:0, on:true});
    } else {
      Shelly.call("Switch.Set", {id:0, on:false});
    }
  }
});