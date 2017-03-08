// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 768;
document.body.appendChild(canvas);

var mouseX = 0;
var mouseY = 0;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";


// littleHandedDon image
var littleHandedDonReady = false;
var littleHandedDonImage = new Image();
littleHandedDonImage.onload = function () {
	littleHandedDonReady = true;
};
littleHandedDonImage.src = "images/donald2.png";


	var imgs = [];
var numImgs = 10;
// In a loop, build up an array of Image objs
for (var i=0; i<numImgs; i++) {
  imgs.push(new Image());
  // Initialize properties here if necessary
  imgs[i].src = "images/drumpf.png";
}

// Game objects
var littleHandedDon = {};
var monster = {};
var monstersCaught = 0;
var nextStep = 100;
var previousStep = 0;


function myFunction(i) {
	objects[i][0] = parseInt(Math.random()*(winWidth-waft));
	objects[i][1] = parseInt(Math.random()*-30);
}

// Update game objects
var update = function (modifier) {


};

// Draw everything
var render = function () {




	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (littleHandedDonReady) {
		ctx.drawImage(littleHandedDonImage, littleHandedDon.x, littleHandedDon.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Drumpfs taken: " + monstersCaught, 32, 32);
};

function readMouseMove(e){

	mouseX = e.clientX;
	mouseY = e.clientY;

	littleHandedDon.x = mouseX - 32;
	littleHandedDon.y = mouseY - 32;

	for(i=0;i<numObjs;i++){
		if (mouseX <= (objects[i][0] + 40)
		&& objects[i][0] <= (mouseX + 40)
		&& mouseY <= (objects[i][1] + 40)
		&& objects[i][1] <= (mouseY + 40)
	) {

		++monstersCaught;
		if (monstersCaught > 100){
			$( "#dialog" ).dialog();
			exit('Congratulations, you killed Donald Drumpf and planet earth is safe now beacuse of you! Time Taken : ' + seconds + 'seconds' );
		}
		myFunction(i, 20);
	}

	}

}
document.onmousemove = readMouseMove;

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	//update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();


var fallObjects=new Array();function newObject(url,height,width){fallObjects[fallObjects.length]=new Array(url,height,width);}

var numObjs=20, waft=50, fallSpeed=1, wind=0;
newObject("images/drumpf.png",28,25);

function winSize(){
	winWidth=canvas.width;
	winHeight=canvas.height;
	canvas.width = winWidth;
	canvas.height = winHeight;
}
function winOfy(){winOffset=(moz)?window.pageYOffset:document.body.scrollTop;}
function fallObject(num,vari,nu){
	objects[num]=new Array(parseInt(Math.random()*(winWidth-waft)),-30,(parseInt(Math.random()*waft))*((Math.random()>0.5)?1:-1),0.02+Math.random()/20,0,1+parseInt(Math.random()*fallSpeed),vari,fallObjects[vari][1],fallObjects[vari][2]);
	if(nu==1){document.write('<img id="fO'+i+'" style="position:absolute;" src="'+fallObjects[vari][0]+'">'); }
}
function fall(){
	for(i=0;i<numObjs;i++){
		var fallingObject=document.getElementById('fO'+i);
		if((objects[i][1]>(winHeight-(objects[i][5]+objects[i][7])))||(objects[i][0]>(winWidth-(objects[i][2]+objects[i][8])))){fallObject(i,objects[i][6],0);}
		//objects[i][0]+=wind;
		objects[i][1]+=objects[i][5];
		//objects[i][4]+=objects[i][3];
		with(fallingObject.style){ top=objects[i][1]+winOffset+"px";left=objects[i][0]+(objects[i][2]*Math.cos(objects[i][4]))+"px";}
	}
	var timerId = setTimeout("fall()",10.5);
}
function exit( status ) {
    // copied part from http://kevin.vanzonneveld.net to stop propogation

    var i;

    if (typeof status === 'string') {
        alert(status);
    }

    window.addEventListener('error', function (e) {e.preventDefault();e.stopPropagation();}, false);

    var handlers = [
        'copy', 'cut', 'paste',
        'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
        'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
        'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
    ];

    function stopPropagation (e) {
        e.stopPropagation();
        // e.preventDefault(); // Stop for the form controls, etc., too?
    }
    for (i=0; i < handlers.length; i++) {
        window.addEventListener(handlers[i], function (e) {stopPropagation(e);}, true);
    }

    if (window.stop) {
        window.stop();
    }

    throw '';
}
var objects=new Array(),winOffset=0,winHeight,winWidth,togvis,moz=(document.getElementById&&!document.all)?1:0;winSize();
for (i=0;i<numObjs;i++){fallObject(i,parseInt(Math.random()*fallObjects.length),1);}

fall();

var span = document.getElementsByTagName('span')[0],
    seconds = 0,t;

function add() {
    seconds++;
    span.textContent =(seconds > 9 ? seconds : "0" + seconds);
  timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


