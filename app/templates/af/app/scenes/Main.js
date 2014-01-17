alert('SceneMain.js loaded');

function SceneMain() {

};

SceneMain.prototype.initialize = function () {
	alert("SceneMain.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
};

SceneMain.prototype.handleShow = function (data) {
	alert("SceneMain.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneMain.prototype.handleHide = function () {
	alert("SceneMain.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneMain.prototype.handleFocus = function () {
	alert("SceneMain.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneMain.prototype.handleBlur = function () {
	alert("SceneMain.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneMain.prototype.handleKeyDown = function (keyCode) {
	alert("SceneMain.handleKeyDown(" + keyCode + ")");
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
