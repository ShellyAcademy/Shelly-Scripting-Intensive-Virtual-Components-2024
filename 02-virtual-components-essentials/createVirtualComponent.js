config = {
    type: "text",
    config: {
      name: "newtext",
      default_value: "hello",
      meta: {
        ui: {
          view: "label"
        }
      }
    }
  }
  
  Shelly.call("Virtual.Add", config, function(result) {
    console.log("result:", result)
  });