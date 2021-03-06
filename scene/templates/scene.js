alert('Scene<%= sceneName %>.js loaded');

function Scene<%= sceneName %>() {

};

Scene<%= sceneName %>.prototype.initialize = function () {
    alert("Scene<%= sceneName %>.initialize()");
    // this function will be called only once when the scene manager show this scene first time
    // initialize the scene controls and styles, and initialize your variables here
    // scene HTML and CSS will be loaded before this function is called
};

Scene<%= sceneName %>.prototype.handleShow = function (data) {
    alert("Scene<%= sceneName %>.handleShow()");
    // this function will be called when the scene manager show this scene
};

Scene<%= sceneName %>.prototype.handleHide = function () {
    alert("Scene<%= sceneName %>.handleHide()");
    // this function will be called when the scene manager hide this scene
};

Scene<%= sceneName %>.prototype.handleFocus = function () {
    alert("Scene<%= sceneName %>.handleFocus()");
    // this function will be called when the scene manager focus this scene
};

Scene<%= sceneName %>.prototype.handleBlur = function () {
    alert("Scene<%= sceneName %>.handleBlur()");
    // this function will be called when the scene manager move focus to another scene from this scene
};

Scene<%= sceneName %>.prototype.handleKeyDown = function (keyCode) {
    alert("Scene<%= sceneName %>.handleKeyDown(" + keyCode + ")");
    // TODO : write an key event handler when this scene get focused
    switch (keyCode) {
        case sf.key.LEFT:
            // Left key pressed
            alert('left key pressed');
            break;
        case sf.key.RIGHT:
            // Right key pressed
            alert('right key pressed');
            break;
        case sf.key.UP:
            // Up key pressed
            alert('up key pressed');
            break;
        case sf.key.DOWN:
            // Down key pressed
            alert('down key pressed');
            break;
        case sf.key.ENTER:
            // Enter key pressed
            alert('enter key pressed');
            break;
        default:
            alert("handle default key event, key code(" + keyCode + ")");
            break;
    }
};
