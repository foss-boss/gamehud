// Create the canvas 
var canvas = document.createElement("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = 1050; 
canvas.height = 750; 
document.body.appendChild(canvas); 
 
// Background image 
var bgReady = false; 
var bgImage = new Image(); 
bgImage.onload = function () { 
 	bgReady = true; 
}; 
bgImage.src = "images/backgroundStage.jpg"; 
 
//Health bar hearts
var fullHeart = new Image();
fullHeart.src = "images/heartFull.png"
var halfHeart = new Image();
halfHeart.src = "images/heartHalf.png"
var emptyHeart = new Image();
emptyHeart.src = "images/heartEmpty.png"


// Health bar settings
//var lowHealthColor = "#FF0000";
//var lowHealthTreshold = 20;

//var mediumHealthColor = "#FFFF00";
//var mediumHealthTreshold = 60;

//var highHealthColor = "#00FF00";

//var healthBarSlotHeight = 40;
//var healthBarSlotWidth = 20;

var currentHP = 6;
var minHP = 0;
var maxHP = 6;
var HPIncreaseValue = 1;
//var HPBarOffset = 2;
	var increaseHP = function() {
	if (currentHP < maxHP)
	{
		currentHP += HPIncreaseValue;
	}
};
 
var decreaseHP = function() {
	if (currentHP > minHP)
	{
		currentHP -= HPIncreaseValue;
	}
}
 
// Handle keyboard controls 
addEventListener("keyup", function (e) { 
	if (e.keyCode == 38) 
	{ 
		// player releasing up 
		increaseHP();
	}
	if (e.keyCode == 40) 
	{ 
		// player releasing down 
		decreaseHP();
	} 
}, false); 
 
// Draw everything 
var render = function () { 
	if (bgReady) { 
		ctx.drawImage(bgImage, 0, 0); 
	} 
 
	// Score 
	ctx.fillStyle = "rgb(250, 250, 250)"; 
 	ctx.font = "24px Helvetica"; 
	ctx.textAlign = "left"; 
	ctx.textBaseline = "top"; 
	//ctx.fillText("Current HP: " + currentHP, 850, 32); 
	
	//Health

	if (currentHP == 6) {
		ctx.drawImage(fullHeart, 800, 60, 70, 70);
		ctx.drawImage(fullHeart, 870, 60, 70, 70);
		ctx.drawImage(fullHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 5) {
		ctx.drawImage(fullHeart, 800, 60, 70, 70);
		ctx.drawImage(fullHeart, 870, 60, 70, 70);
		ctx.drawImage(halfHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 4) {
		ctx.drawImage(fullHeart, 800, 60, 70, 70);
		ctx.drawImage(fullHeart, 870, 60, 70, 70);
		ctx.drawImage(emptyHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 3) {
		ctx.drawImage(fullHeart, 800, 60, 70, 70);
		ctx.drawImage(halfHeart, 870, 60, 70, 70);
		ctx.drawImage(emptyHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 2) {
		ctx.drawImage(fullHeart, 800, 60, 70, 70);
		ctx.drawImage(emptyHeart, 870, 60, 70, 70);
		ctx.drawImage(emptyHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 1) {
				ctx.drawImage(halfHeart, 800, 60, 70, 70) ;
				ctx.drawImage(emptyHeart, 870, 60, 70, 70);
				ctx.drawImage(emptyHeart, 940, 60, 70, 70);
	}
	else if (currentHP == 0) {
		ctx.drawImage(emptyHeart, 800, 60, 70, 70);
		ctx.drawImage(emptyHeart, 870, 60, 70, 70);
		ctx.drawImage(emptyHeart, 940, 60, 70, 70);
	}
	

	// Health Bar Rectangles
	/*var currentColor = highHealthColor;
	
	if ( currentHP <= lowHealthTreshold )
	{
		currentColor = lowHealthColor;
	}
	else if ( currentHP > lowHealthTreshold && currentHP < mediumHealthTreshold )
	{
		currentColor = mediumHealthColor;
	}
	
	for (i = 0; i < currentHP/10; i++){
		ctx.fillStyle = currentColor;
		
		var xPosition = 850 + (i*healthBarSlotWidth);
		
		ctx.fillRect( xPosition, 60, healthBarSlotWidth, healthBarSlotHeight);
	}*/
}; 

// The main game loop 
var main = function () { 

 	render(); 
 
 	// Request to do this again ASAP 
 	requestAnimationFrame(main); 
 }; 
 
 
// Cross-browser support for requestAnimationFrame 
var w = window; 
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame; 
 
// Let's play this game! 
main(); 
