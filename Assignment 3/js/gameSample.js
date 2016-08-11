// Create the canvas 
var canvas = document.createElement("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = 1050; 
canvas.height = 750; 
document.body.appendChild(canvas); 
var x;
var y;

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
var pistolCapacity = 60;
var machineGun = new Image();
machineGun.src = "images/machineGun.png"
var machineGunAmmo = 60;
var machineGunCapacity = 600;
var weaponSelection = 1;
var currentWeapon = "Pistol";
var machineGunFiring;
var minAmmo = 0;
var knife = new Image();
knife.src = "images/knife.png"


//Item settings
var rope = new Image();
rope.src = "images/rope.png";
var bomb = new Image();
bomb.src = "images/bomb.png";
var itemSelection = 1;
var bombTipX = 170;
var ropeTipX = 250;
var tipY = 700;
var ropeUsed = false; 
var bombUsed = false;  


//Gold settings
var currentGold = 0; 
var goldCoin = new Image();
goldCoin.src = "images/coin.gif"

//Health bar hearts
var fullHeart = new Image();
fullHeart.src = "images/heartFull.png"
var halfHeart = new Image();
halfHeart.src = "images/heartHalf.png"
var emptyHeart = new Image();
emptyHeart.src = "images/heartEmpty.png"

var healthFlash = false; 
var currentHP = 6;
var minHP = 0;
var maxHP = 6;
var HPIncreaseValue = 1;
var mins = 0;
var secs = 0;
var tenths = 0;
//Time settings
	var time = 0;
	window.onload = function() {
	setInterval(function() {
	time++;
	mins = Math.floor(time/10/60);
	secs = Math.floor(time/10 % 60);
	tenths = Math.floor(time % 10);	
	if (mins < 10) {
		mins = "0" + mins;
	}
	if (secs < 10) {
		secs = "0" + secs;
	}
	}, 100);
	}
//Mini Map settings
var mapOpen = 0;
var isOpen = false;
var miniMap = new Image();
miniMap.src = "images/miniMap.png"
var map = new Image();
map.src = "images/map.png"
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
			machineGunAmmo--;
			if (machineGunAmmo < 0) {
				machineGunAmmo = 0;
			}
			}, 100);
	}
	else if(machineGunAmmo == 0) {
		clearInterval(machineGunFiring);
	}
		break;
	case 3:
		break;
	}
}

function stopMachineGun() {
	clearInterval(machineGunFiring);
}

function getCoords() {
	x = window.event.clientX;
	y = window.event.clientY;
}

function removeItem() {
	if (itemSelection == 1) {
		ropeUsed = true; 
	}
	if (itemSelection == 2) {
		bombUsed = true;
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
	if (e.keyCode == 37)
	{	
		if (itemSelection == 2) 
			itemSelection = 1;
	}
	if (e.keyCode == 39)
	{
		if (itemSelection == 1)
			itemSelection = 2;
	}
	if (e.keyCode == 69) 
	{
		if (itemSelection == 1 || itemSelection == 2) {
			removeItem();
		}
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
				setTimeout(function(){
				if (pistolCapacity > 12) {
					pistolCapacity = pistolCapacity - (12 - pistolAmmo);
					pistolAmmo = 12;
					if (pistolCapacity <= 12) {
					pistolAmmo = pistolCapacity;
					pistolCapacity = 12; 
					}
				}
					}, 1500);
				break;
			case 2:
				setTimeout(function(){
				if (machineGunCapacity > 60) {
					machineGunCapacity = machineGunCapacity - (60 - machineGunAmmo);
					machineGunAmmo = 60;
					if (machineGunCapacity <= 60) {
					machineGunAmmo = machineGunCapacity;
					machineGunCapacity = 60;
					}
				}
					}, 3000);					
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
	if (e.keyCode == 77)
	{
		if (isOpen == false) {
		mapOpen = 1;
		isOpen = true;
		}
		else if (isOpen == true) {
		mapOpen = 0;
		isOpen = false;
		}
	}
}, false);

//Handle mouse controls
window.addEventListener("mousedown", fireWeapon, false);
window.addEventListener("mouseup", stopMachineGun, false);
window.addEventListener("mousemove", getCoords, false);

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
	ctx.fillText("Gold: " + currentGold, 33, 130);
	
	//Ammo counter
	switch (weaponSelection){
		case 1:
			ctx.fillText(pistolAmmo + "/" + pistolCapacity, 1003, 635);
			break;
		case 2:
			ctx.fillText(machineGunAmmo + "/" + machineGunCapacity, 1003, 635);
			break;
		case 3:
			ctx.fillText("--", 1003, 635);
			break;
	}
	
	//Display Stage Name
	ctx.fillText("Stage Three : Alien Mines", 510, 0);
	

	//Health
	if (currentHP == 6) {
		ctx.drawImage(fullHeart, 830, 27, 70, 70);
		ctx.drawImage(fullHeart, 900, 27, 70, 70);
		ctx.drawImage(fullHeart, 970, 27, 70, 70);
	}
	else if (currentHP == 5) {
		ctx.drawImage(fullHeart, 830, 27, 70, 70);
		ctx.drawImage(fullHeart, 900, 27, 70, 70);
		ctx.drawImage(halfHeart, 970, 27, 70, 70);
	}
	else if (currentHP == 4) {
		ctx.drawImage(fullHeart, 830, 27, 70, 70);
		ctx.drawImage(fullHeart, 900, 27, 70, 70);
		ctx.drawImage(emptyHeart, 970, 27, 70, 70);
	}
	else if (currentHP == 3) {
		ctx.drawImage(fullHeart, 830, 27, 70, 70);
		ctx.drawImage(halfHeart, 900, 27, 70, 70);
		ctx.drawImage(emptyHeart, 970, 27, 70, 70);
	}
	else if (currentHP == 2) {
		ctx.drawImage(fullHeart, 830, 27, 70, 70);
		ctx.drawImage(emptyHeart, 900, 27, 70, 70);
		ctx.drawImage(emptyHeart, 970, 27, 70, 70);
	}
	else if (currentHP == 1) {
		var frequency = 500;
		if (healthFlash || Math.floor(Date.now() / frequency) % 2) {
			ctx.drawImage(halfHeart, 830, 27, 70, 70);
			ctx.drawImage(emptyHeart, 900, 27, 70, 70);
			ctx.drawImage(emptyHeart, 970, 27, 70, 70);	
		}
	}
	else if (currentHP == 0) {
		ctx.drawImage(emptyHeart, 830, 27, 70, 70);
		ctx.drawImage(emptyHeart, 900, 27, 70, 70);
		ctx.drawImage(emptyHeart, 970, 27, 70, 70);
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
	
	//draw item
	if (itemSelection == 1 && ropeUsed == false){
		ctx.drawImage(rope, 0, 660, 96, 96);
		if (x < 97 && y > 660) {
			ctx.fillText("Can be used to climb up or down", ropeTipX, tipY);
			ctx.strokeStyle = "white";
			ctx.rect(100, 692, 300, 38);
			ctx.stroke();
		}
		
	}
	else if (itemSelection == 2 && bombUsed == false){
		ctx.drawImage(bomb, 0, 660, 96, 96);
		if (x < 97 && y > 660) {
			ctx.fillText("Destroys walls", bombTipX, tipY);
			ctx.strokeStyle = "white";
			ctx.rect(100, 692, 300, 38);
			ctx.stroke();
		}
	}
	
	//draw mini map and map
	ctx.drawImage(miniMap, 0, 0)

	if (mapOpen == 1) {
		ctx.drawImage(map, 75, 75)
	}
	//draw time 
	ctx.fillText(mins + ":" + secs + ":" + "0" + tenths, 40, 100);

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
