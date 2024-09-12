const CONFIG = {
    WIND_GUST_THRESHOLD_VC: "number:200",
    WIND_GUST_VC: "number:207",
    COVER_CONTROL_DEVICE_IP: "192.168.0.9"
  }
  
  let windGustVC = Virtual.getHandle(CONFIG.WIND_GUST_VC);
  let windGustThresholdVC = Virtual.getHandle(CONFIG.WIND_GUST_THRESHOLD_VC);
  
  function closeCover() {
    let url = "http://" + CONFIG.COVER_CONTROL_DEVICE_IP + "/rpc/Cover.GetStatus?id=0";
    Shelly.call("HTTP.GET", {url:url}, function(result) {
      let response = JSON.parse(result.body);
      // close the cover only when in stopped or open state
      if (response.state === "stopped" || response.state === "open") {
        console.log("Closing cover");
        let url = "http://" + CONFIG.COVER_CONTROL_DEVICE_IP + "/rpc/Cover.Close?id=0";
        Shelly.call("HTTP.GET", {url: url});
      }
    })
  }
  
  function openCover() {
    let url = "http://" + CONFIG.COVER_CONTROL_DEVICE_IP + "/rpc/Cover.GetStatus?id=0";
    Shelly.call("HTTP.GET", {url:url}, function(result) {
      let response = JSON.parse(result.body);
      // open the cover only when in stopped or closed state
      if (response.state === "stopped" || response.state === "closed") {
        console.log("Opening cover");
        let url = "http://" + CONFIG.COVER_CONTROL_DEVICE_IP + "/rpc/Cover.Open?id=0";
        Shelly.call("HTTP.GET", {url: url});
      }
    })
  }
  
  function checkWindGust() {
    let windGust = windGustVC.getValue();
    let windGustThreshold = windGustThresholdVC.getValue();
    
    if (windGust > windGustThreshold) {
      console.log("High wind gusting detected!");
      closeCover();
    } else {
      console.log("Normal wind conditions!");
      openCover();
    }
  }
  
  windGustVC.on("change", function(eventData) {
    checkWindGust();
  });
  
  windGustThresholdVC.on("change", function() {
    checkWindGust();
  });