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

//Weapon settings
var pistol = new Image();
pistol.src = "images/pistol.png"
var pistolAmmo = 12;
var machineGun = new Image();
machineGun.src = "images/machineGun.png"
var machineGunAmmo = 60;
var weaponSelection = 1;
var currentWeapon = "Pistol";
var machineGunFiring;
var minAmmo = 0;
var knife = new Image();
knife.src = "images/knife.png"

//Gold settings
var currentGold = 0; 

//Health bar hearts
var fullHeart = new Image();
fullHeart.src = "images/heartFull.png"
var halfHeart = new Image();
halfHeart.src = "images/heartHalf.png"
var emptyHeart = new Image();
emptyHeart.src = "images/heartEmpty.png"

var currentHP = 6;
var minHP = 0;
var maxHP = 6;
var HPIncreaseValue = 1;

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
 	ctx.font = "20px Helvetica"; 
	ctx.textAlign = "center"; 
	ctx.textBaseline = "top"; 
	
	//Display Current Gold
	ctx.fillText("Gold: " + currentGold, 32, 100);
	
	//Ammo counter
	switch (weaponSelection){
		case 1:
			ctx.fillText("Ammo: " + pistolAmmo, 1003, 635);
			break;
		case 2:
			ctx.fillText("Ammo: " + machineGunAmmo, 1003, 635);
			break;
		case 3:
			ctx.fillText("Ammo: --", 1003, 635);
			break;
	}
	
	//Display current weapon
	//ctx.fillText("Weapon: " + currentWeapon, , 690);
	

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
	
	
	//draw weapons
	if (weaponSelection == 1) {
		ctx.drawImage(pistol, 955, 660)
	}
	else if (weaponSelection == 2) {
		ctx.drawImage(machineGun, 955, 660)
	}
	else if (weaponSelection == 3) {
		ctx.drawImage(knife, 955, 660)
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
