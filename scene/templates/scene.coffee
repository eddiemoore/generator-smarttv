Scene<%= sceneName %> = ->
alert "Scene<%= sceneName %>.js loaded"
Scene<%= sceneName %>::initialize = ->
  alert "Scene<%= sceneName %>.initialize()"


# this function will be called only once when the scene manager show this scene first time
# initialize the scene controls and styles, and initialize your variables here
# scene HTML and CSS will be loaded before this function is called
Scene<%= sceneName %>::handleShow = (data) ->
  alert "Scene<%= sceneName %>.handleShow()"


# this function will be called when the scene manager show this scene
Scene<%= sceneName %>::handleHide = ->
  alert "Scene<%= sceneName %>.handleHide()"


# this function will be called when the scene manager hide this scene
Scene<%= sceneName %>::handleFocus = ->
  alert "Scene<%= sceneName %>.handleFocus()"


# this function will be called when the scene manager focus this scene
Scene<%= sceneName %>::handleBlur = ->
  alert "Scene<%= sceneName %>.handleBlur()"


# this function will be called when the scene manager move focus to another scene from this scene
Scene<%= sceneName %>::handleKeyDown = (keyCode) ->
  alert "Scene<%= sceneName %>.handleKeyDown(" + keyCode + ")"
  
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