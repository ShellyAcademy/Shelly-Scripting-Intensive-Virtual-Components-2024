let CONFIG = {
    TEMPERATURE_VC: "number:200"
  }
  
  Shelly.call("Number.Set", {id: 200, value: 23}, function(result) {
    console.log("value after callback:", Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC).value);
  });
  
  // because Number.Set is aync operation we may not have the value changed immediately
  // need to be careful when reading it and do not expect to be changed
  console.log(Shelly.getComponentStatus(CONFIG.TEMPERATURE_VC).value);