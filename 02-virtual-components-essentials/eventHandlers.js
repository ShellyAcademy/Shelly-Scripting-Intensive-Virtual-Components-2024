const VC_NAME="button:200";

Shelly.addEventHandler(function(eventData) {
  // make sure eventData.component exists with this check  (typeof eventData.component != "undefined")
  if (typeof eventData.component != "undefined" && eventData.component === VC_NAME) {
    if (eventData.info.event === "single_push") {
      Shelly.call("Switch.Set", {id:0, on: true});
    } else if (eventData.info.event === "double_push") {
      Shelly.call("Switch.Set", {id:0, on: false});
    } else if (eventData.info.event === "long_push") {
      Shelly.call("Switch.Toggle", {id: 0});
    }
  }
})