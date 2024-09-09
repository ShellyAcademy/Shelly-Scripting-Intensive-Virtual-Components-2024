const CONFIG = {
    TEMPERATURE_VC: "number:200"
  }
  
  Timer.set(5000, true, function() {
    let temperature = Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC).value;
    console.log(temperature);
  });