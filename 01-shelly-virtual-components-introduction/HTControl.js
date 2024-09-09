const CONFIG = {
    HT_TEMP_VC: "number:203",
    HT_HUM_VC: "number:204"
  }
  
  Timer.set(5000, true, function() {
    let temperature = Shelly.getComponentStatus(CONFIG.HT_TEMP_VC).value;
    let humidity = Shelly.getComponentStatus(CONFIG.HT_HUM_VC).value;
    
    if (temperature > 30) {
      console.log("High temperature");
    } else if (temperature > 18) {
      console.log("Normal temperature");
    } else {
      console.log("Low temperature");
    }
    
    if (humidity > 70) {
      console.log("High humidity");
    } else if (humidity > 40) {
      console.log("Normal humidity");
    } else {
      console.log("Low humidity");
    }
  });