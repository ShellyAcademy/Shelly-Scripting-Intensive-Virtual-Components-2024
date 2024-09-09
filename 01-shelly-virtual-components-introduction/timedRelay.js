// We want to read a value of a slider representing time to turn on a relay
const CONFIG = {
    TIME_VC: "number:201",
    TIME_VC_ID: 201
  }
  
  let time = Shelly.getComponentStatus(CONFIG.TIME_VC).value;
  console.log("Setting timer to", time, "s");
  
  Shelly.call("Switch.Set", {id:0, on:true});
  
  let timerValue = time * 1000; // for minutes we can use time * 60 * 1000
  
  Timer.set(timerValue, false, function() {
    console.log("Turning light off");
    Shelly.call("Switch.Set", {id:0, on:false});
  });
  
  let sliderTimerHandle = Timer.set(1000, true, function() {
    let time = Shelly.getComponentStatus(CONFIG.TIME_VC).value;
    if (time > 0) {
      Shelly.call("Number.Set", { id: CONFIG.TIME_VC_ID, value: time - 1 });
    } else {
      Timer.clear(sliderTimerHandle);
    }
  });