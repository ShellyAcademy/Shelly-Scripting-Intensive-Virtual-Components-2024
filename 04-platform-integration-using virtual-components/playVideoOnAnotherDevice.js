let url = "http://192.168.0.202/rpc/Button.Trigger?id=202&event=single_push";
Shelly.call("HTTP.GET", {url:url});