const CONFIG = {
    TEMPERATURE_VC: "number:200",
    WARM_VC: "button:201",
    MODERATE_VC: "button:202",
    COLD_VC: "button:203"
  }
  
  let temperatureNumber = Virtual.getHandle(CONFIG.TEMPERATURE_VC)
  let warmButton = Virtual.getHandle(CONFIG.WARM_VC)
  let moderateButton = Virtual.getHandle(CONFIG.MODERATE_VC)
  let coldButton = Virtual.getHandle(CONFIG.COLD_VC)
  
  // virtualHandle.setValue(value) is an async operation
  temperatureNumber.setValue(27);
  // the value of the component will change later and reading it now will
  // return the old value
  console.log("Current temperature is", temperatureNumber.getValue());
  
  warmButton.on("single_push", function(e) { temperatureNumber.setValue(27)});
  moderateButton.on("single_push", function(e) { temperatureNumber.setValue(20)});
  coldButton.on("single_push", function(e) { temperatureNumber.setValue(17)});