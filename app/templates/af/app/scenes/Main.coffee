SceneMain = ->
alert "SceneMain.js loaded"
SceneMain::initialize = ->
  alert "SceneMain.initialize()"


# this function will be called only once when the scene manager show this scene first time
# initialize the scene controls and styles, and initialize your variables here
# scene HTML and CSS will be loaded before this function is called
SceneMain::handleShow = (data) ->
  alert "SceneMain.handleShow()"


# this function will be called when the scene manager show this scene
SceneMain::handleHide = ->
  alert "SceneMain.handleHide()"


# this function will be called when the scene manager hide this scene
SceneMain::handleFocus = ->
  alert "SceneMain.handleFocus()"


# this function will be called when the scene manager focus this scene
SceneMain::handleBlur = ->
  alert "SceneMain.handleBlur()"


# this function will be called when the scene manager move focus to another scene from this scene
SceneMain::handleKeyDown = (keyCode) ->
  alert "SceneMain.handleKeyDown(" + keyCode + ")"
  
  # TODO : write an key event handler when this scene get focused
  switch keyCode
    when sf.key.LEFT
      # Left key pressed
      alert "left key pressed"
    when sf.key.RIGHT
      # Right key pressed
      alert "right key pressed"
    when sf.key.UP
      # Up key pressed
      alert "up key pressed"
    when sf.key.DOWN
      # Down key pressed
      alert "down key pressed"
    when sf.key.ENTER
      # Enter key pressed
      alert "enter key pressed"
    else
      alert "handle default key event, key code(" + keyCode + ")"