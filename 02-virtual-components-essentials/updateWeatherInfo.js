const CONFIG = {
    HT_TEMP_VC: "number:200",
    HT_HUM_VC: "number:201",
    OUT_TEMP_VC: "number:202",
    OUT_HUM_VC: "number:203",
    OUT_WIND_VC: "number:204",
    WEATHER_INFO_VC: "text:200"
  }
  
  let htTempVC = Virtual.getHandle(CONFIG.HT_TEMP_VC);
  let htHumVC = Virtual.getHandle(CONFIG.HT_HUM_VC);
  let outTempVC = Virtual.getHandle(CONFIG.OUT_TEMP_VC);
  let outHumVC = Virtual.getHandle(CONFIG.OUT_HUM_VC);
  let outWindVC = Virtual.getHandle(CONFIG.OUT_WIND_VC); 
  let weatherInfoVC = Virtual.getHandle(CONFIG.WEATHER_INFO_VC);
  
  function updateWeatherInfo() {
    let weatherInfo = {}
    weatherInfo.indoorTemperature = htTempVC.getValue();
    weatherInfo.indoorHumidity = htHumVC.getValue();
    weatherInfo.outsideTemperature = outTempVC.getValue();
    weatherInfo.outsideHumidity = outHumVC.getValue();
    weatherInfo.outsideWind = outWindVC.getValue();
  }