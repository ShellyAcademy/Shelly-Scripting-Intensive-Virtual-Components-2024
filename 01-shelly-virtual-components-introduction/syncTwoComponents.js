const CONFIG = {
    TEMPERATURE_C_VC: "number:200",
    TEMPERATURE_F_VC_ID: 202
  }
  
  let old_temp = -1000;
  
  Timer.set(2000, true, function() {
    let temperature_c = Shelly.getComponentStatus(CONFIG.TEMPERATURE_C_VC).value;
    if (temperature_c != old_temp) {
      let temperature_f = (temperature_c * 9 / 5) + 32;
      console.log("Teperature changed, setting the F value to", temperature_f);
      Shelly.call("Number.Set", {id: CONFIG.TEMPERATURE_F_VC_ID, value: temperature_f});
      old_temp = temperature_c;
    }
  })