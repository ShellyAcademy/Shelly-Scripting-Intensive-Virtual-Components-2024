let CONFIG = {
    STATE_ENUM_VC: "enum:201",
    STATE_BUTTON_VC: "button:204"
  }
  
  let enumState = Virtual.getHandle(CONFIG.STATE_ENUM_VC);
  let buttonState = Virtual.getHandle(CONFIG.STATE_BUTTON_VC);
  
  options = enumState.getConfig().options;
  
  let idx = 0
  
  buttonState.on("single_push", function() {
    let state = options[idx];
    console.log("Setting state to", state);
    // setting the value of the state enum
    enumState.setValue(state);
    idx++;
    if (idx===options.length)
      idx=0
  });