const CONFIG = {
    TEMP_VC: "number:200",
    HUMIDITY_VC: "number:201"
  }
  
  let tempVC = Virtual.getHandle(CONFIG.TEMP_VC);
  let humidityVC = Virtual.getHandle(CONFIG.HUMIDITY_VC);
  
  tempVC.on("change", function(eventData) {
    let value = eventData.value;
    
    if (value > 30)
      console.log("High temperature");
    else if (value > 18)
      console.log("Normal temperature");
    else {
      console.log("Low temperature");
    }
  });
  
  humidityVC.on("change", function(eventData) {
    let value = eventData.value;
    
    if (value > 70)
      console.log("High humidity");
    else if (value > 40)
      console.log("Normal humidity");
    else {
      console.log("Low humidity");
    }
  });