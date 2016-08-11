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
bgImage.src = "images/sampleBG.jpg"; 

//Weapon settings
var pistol = new Image();
pistol.src = "images/pistol.png"
var pistolAmmo = 12;
var machineGun = document.createElement("machineGun");
var machineGunAmmo = 60;
var weaponSelection = 1;
var currentWeapon = "Pistol";
var machineGunFiring;
var minAmmo = 0;
var knife = document.createElement("knife");

//Gold settings
var currentGold = 0; 

// Health bar settings
var lowHealthColor = "#FF0000";
var lowHealthTreshold = 20;

var mediumHealthColor = "#FFFF00";
var mediumHealthTreshold = 60;

var highHealthColor = "#00FF00";

var healthBarSlotHeight = 40;
var healthBarSlotWidth = 20;

var currentHP = 50;
var minHP = 0;
var maxHP = 100;
var HPIncreaseValue = 10;
var HPBarOffset = 2;

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

var fireWeapon = function(){
	switch (weaponSelection){
	case 1:
		if (pistolAmmo != 0) {
		pistolAmmo--;
		}
		break;
	case 2: 
	if (machineGunAmmo > 0) {
		machineGunFiring = setInterval(function(){
			machineGunAmmo--;}, 100);
	}
	else if(machineGunAmmo == 0) {
		clearInterval(machineGunFiring);
	}
		break;
	case 3:
		break;
	}
}

function stopMachineGun(){
	clearInterval(machineGunFiring);
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
	if (e.keyCode == 49)
	{
		weaponSelection = 1;
		currentWeapon = "Pistol";
	}
	if (e.keyCode == 50)
	{
		weaponSelection = 2;
		currentWeapon = "Machine Gun";
	}
	if (e.keyCode == 51)
	{
		weaponSelection = 3;
		currentWeapon = "Knife";
	}
	if (e.keyCode == 82)
	{
		switch (weaponSelection){
			case 1:
				setTimeout(function(){pistolAmmo = 12;}, 1500);
				break;
			case 2:
				setTimeout(function(){machineGunAmmo = 60;}, 3000);
				break;
		}
	}
	if (e.keyCode == 71)
	{
		var howMuchGold = Math.random() * 100;
		if (howMuchGold >= 0 && howMuchGold < 90) {
			currentGold = currentGold + 1;
		}
		else if (howMuchGold >= 90 && howMuchGold < 99) {
			currentGold = currentGold + 10;
		}
		else if (howMuchGold >= 99 && howMuchGold < 100) {
			currentGold = currentGold + 100;
		}
	}
}, false);

//Handle mouse controls
window.addEventListener("mousedown", fireWeapon, false);
window.addEventListener("mouseup", stopMachineGun, false);

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
	ctx.fillText("Current HP: " + currentHP, 32, 32); 
	
	//Display Current Gold
	ctx.fillText("Gold: " + currentGold, 32, 100);
	
	//Ammo counter
	switch (weaponSelection){
		case 1:
			ctx.fillText("Ammo: " + pistolAmmo, 955, 635);
			break;
		case 2:
			ctx.fillText("Ammo: " + machineGunAmmo, 800, 720);
			break;
		case 3:
			ctx.fillText("Ammo: --", 800, 720);
			break;
	}
	
	//Display current weapon
	//ctx.fillText("Weapon: " + currentWeapon, , 690);
	
	// Health Bar Rectangles
	var currentColor = highHealthColor;
	
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
		
		var xPosition = 32 + (i*healthBarSlotWidth);
		
		ctx.fillRect( xPosition, 60, healthBarSlotWidth, healthBarSlotHeight);
	}
	
	//draw weapons
	if (weaponSelection == 1) {
		ctx.drawImage(pistol, 955, 660)
	}
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
