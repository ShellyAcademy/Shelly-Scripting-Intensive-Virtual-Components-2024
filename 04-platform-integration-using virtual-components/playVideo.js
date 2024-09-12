const CONFIG = {
    HA_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3MjQxZmRkMGQ2NGU0YTExOTkyOGM2MTEwMjI4MDRmYyIsImlhdCI6MTcyNjE2NzE0NywiZXhwIjoyMDQxNTI3MTQ3fQ.pGXfqQAz10iL1P5c_6UGsalOLNm4RHWKNTAZCcx_Iek",
    PLAY_VIDEO_URL: "http://192.168.0.228:8123/api/services/media_player/play_media",
    VIDEO_URL_VC: "text:201",
    PLAY_VIDEO_VC: "button:202"
  }
  
  let videoUrlVC = Virtual.getHandle(CONFIG.VIDEO_URL_VC);
  let playVideoVC = Virtual.getHandle(CONFIG.PLAY_VIDEO_VC);
  
  let headers = {
    "Authorization": "Bearer " + CONFIG.HA_TOKEN
  }
  
  playVideoVC.on("single_push", function() {
    let videoUrl = videoUrlVC.getValue();
    let request = {
      "entity_id": "media_player.living_room_tv",
      "media_content_id": videoUrl,
      "media_content_type": "video"
    }
    console.log("Playing", videoUrl, "on tv.");
    Shelly.call("HTTP.Request", {url: CONFIG.PLAY_VIDEO_URL, method: "POST", 
                headers: headers, body: request});
  });