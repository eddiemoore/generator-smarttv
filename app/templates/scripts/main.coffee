widgetAPI = new Common.API.Widget()
tvKey = new Common.API.TVKeyValue()
Main = {}
Main.onLoad = ->
  
  # Enable key event processing
  @enableKeys()
  widgetAPI.sendReadyEvent()

Main.onUnload = ->
  #TODO insert unload code here

Main.enableKeys = ->
  document.getElementById("anchor").focus()

Main.keyDown = ->
  keyCode = event.keyCode
  alert "Key pressed: " + keyCode
  switch keyCode
    when tvKey.KEY_RETURN, tvKey.KEY_PANEL_RETURN
      alert "RETURN"
      widgetAPI.sendReturnEvent()
    when tvKey.KEY_LEFT
      alert "LEFT"
    when tvKey.KEY_RIGHT
      alert "RIGHT"
    when tvKey.KEY_UP
      alert "UP"
    when tvKey.KEY_DOWN
      alert "DOWN"
    when tvKey.KEY_ENTER, tvKey.KEY_PANEL_ENTER
      alert "ENTER"
    else
      alert "Unhandled key"