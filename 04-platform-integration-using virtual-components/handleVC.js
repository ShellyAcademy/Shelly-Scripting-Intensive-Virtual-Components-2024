let CONFIG_HUE = {
  HUE_BRIDGE_IP: "192.168.0.15",
  HUE_USER: "eampuuwAtPSgj7yLi8VbDrhRw46EUGP2U6tdqUo5",
  BRIGHTNESS_VC: "number:200",
  HUE_LIGHTS: [1, 2, 3],
  DIMMER_LIGHTS: [0]
}

let brightnessSlider = Virtual.getHandle(CONFIG_HUE.BRIGHTNESS_VC);

brightnessSlider.on("change", function(eventData) {
  let brightness = Math.round(eventData.value * 2.54);
  for (hueLight of CONFIG_HUE.HUE_LIGHTS) {
    let url = "http://" + CONFIG_HUE.HUE_BRIDGE_IP + "/api/" + CONFIG_HUE.HUE_USER +
              "/lights/" + hueLight + "/state";
    let body = {
      "on": true,
      "bri": brightness
    }
    Shelly.call("HTTP.Request", {url:url, method: "PUT", body:body});
  }
  
  for (dimmerLight of CONFIG_HUE.DIMMER_LIGHTS) {
    Shelly.call("Light.Set", {id: dimmerLight, on: true, brightness: eventData.value});
  }
});

const CONFIG_HA = {
  HA_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3MjQxZmRkMGQ2NGU0YTExOTkyOGM2MTEwMjI4MDRmYyIsImlhdCI6MTcyNjE2NzE0NywiZXhwIjoyMDQxNTI3MTQ3fQ.pGXfqQAz10iL1P5c_6UGsalOLNm4RHWKNTAZCcx_Iek",
  SPEAK_URL: "http://192.168.0.228:8123/api/services/tts/speak",
  PLAY_VIDEO_URL: "http://192.168.0.228:8123/api/services/media_player/play_media",
  TTS_MESSAGE_VC: "text:200",
  TTS_SPEAK_VC: "button:201",
  VIDEO_URL_VC: "text:201",
  PLAY_VIDEO_VC: "button:202"
}

let messageVC = Virtual.getHandle(CONFIG_HA.TTS_MESSAGE_VC);
let speakVC = Virtual.getHandle(CONFIG_HA.TTS_SPEAK_VC);

let headers = {
  "Authorization": "Bearer " + CONFIG_HA.HA_TOKEN
}

speakVC.on("single_push", function() {
  let message = messageVC.getValue();
  let request = {
    "entity_id": "tts.google_translate_en_com",
    "media_player_entity_id": "media_player.living_room_speaker",
    "message": message
  }
  console.log("Sending", message, "to the speaker.");
  Shelly.call("HTTP.Request", {url: CONFIG_HA.SPEAK_URL, method: "POST", 
              headers: headers, body: request});
});

let videoUrlVC = Virtual.getHandle(CONFIG_HA.VIDEO_URL_VC);
let playVideoVC = Virtual.getHandle(CONFIG_HA.PLAY_VIDEO_VC);

playVideoVC.on("single_push", function() {
  let videoUrl = videoUrlVC.getValue();
  let request = {
    "entity_id": "media_player.living_room_tv",
    "media_content_id": videoUrl,
    "media_content_type": "video"
  }
  console.log("Playing", videoUrl, "on tv.");
  Shelly.call("HTTP.Request", {url: CONFIG_HA.PLAY_VIDEO_URL, method: "POST", 
              headers: headers, body: request});
});