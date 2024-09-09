const CONFIG = {
    TEMPERATURE_LOCAL_VC_ID: 200,
    TEMPERATURE_OTHER_DEVICE_VC_ID: 200,
    OTHER_DEVICE_IP: "192.168.0.202"
  }
  
  let old_temp = -1000;
  
  Timer.set(2000, true, function() {
    Shelly.call("Number.GetStatus", {id: CONFIG.TEMPERATURE_LOCAL_VC_ID}, function(result) {
      let temperature = result.value;
      if (temperature != old_temp) {
        let url = "http://" + CONFIG.OTHER_DEVICE_IP + 
          "/rpc/Number.Set?id=" + CONFIG.TEMPERATURE_OTHER_DEVICE_VC_ID + 
          "&value=" + temperature;
        Shelly.call("HTTP.GET", {url: url});
        old_temp = temperature;
      }
    });
  })