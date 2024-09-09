const CONFIG = {
    TEMPERATURE_VC: "number:200"
  }
  
  let temperatureStatus = Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC)
  let temperatureValue = temperatureStatus.value;
  
  console.log("Temperature is:", temperatureValue , "C°")