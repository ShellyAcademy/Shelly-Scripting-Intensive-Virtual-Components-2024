let temperatureHandle = Virtual.getHandle("number:200");
let buttonHandle = Virtual.getHandle("button:200");

temperatureHandle.on("change", function(e) {
  if (e.value>100) {
    let config = {
      meta: {
        ui: {
          view: "hidden"
        }
      }
    }
    buttonHandle.setConfig(config);
  } else {
    let config = {
      meta: {
        ui: {
          view: "button"
        }
      }
    }
    buttonHandle.setConfig(config);
  }
})