let VC_NAME = "number:200"

function handleStatusChanges(eventData, userData) {
  if (eventData.component === VC_NAME && eventData.delta.value) {
    let value = eventData.delta.value;
    console.log("Component", VC_NAME, "changed it's value to", value);
  }
}

Shelly.addStatusHandler(handleStatusChanges, { "name": "test" });