let CONFIG = {
    TEMPERATURE_VC: "number:200"
  }
  
  Shelly.call("Number.GetStatus", { id: 200 }, function(result) {
    let temperature = result.value;
    console.log("Temperature is", temperature);
  });
  
  console.log("After shelly.call");