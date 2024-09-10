const CONFIG = {
    LAT: 42.2875,
    LONG: 22.6953,
    OUTSIDE_TEMP_VC: "number:202",
    OUTSIDE_HUM_VC: "number:203",
    OUTSIDE_WIND_VC: "number:204"
  }
  let currentHTUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + CONFIG.LAT + 
      "&longitude=" + CONFIG.LONG + "&current=temperature_2m,relative_humidity_2m";
  let currentWindUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + CONFIG.LAT + 
      "&longitude=" + CONFIG.LONG + "&current=wind_speed_10m"
  
  let outsideTempVC = Virtual.getHandle(CONFIG.OUTSIDE_TEMP_VC);
  let outsideHumVC = Virtual.getHandle(CONFIG.OUTSIDE_HUM_VC);
  let outsideWindVC = Virtual.getHandle(CONFIG.OUTSIDE_WIND_VC);
  
  Timer.set(10000, true, function() {
    Shelly.call("HTTP.GET", {url:currentHTUrl}, function(response) {
      let body = JSON.parse(response.body);
      let temperature = body.current.temperature_2m;
      let humidity = body.current.relative_humidity_2m;
      
      outsideTempVC.setValue(temperature);
      outsideHumVC.setValue(humidity);
    });
    Shelly.call("HTTP.GET", {url:currentWindUrl}, function(response) {
      let body = JSON.parse(response.body);
      let windSpeed = body.current.wind_speed_10m;
      outsideWindVC.setValue(windSpeed);
    });
  });