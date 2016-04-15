//----------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
// Non-Javascript Constants
//----------------------------------------------------------------------------------------------------

var userInterface = "<div id='gameScreen'>\
	<div id='svgCont'>\
		<svg id='gameArea' width='0px' height='0px'></svg>\
	</div>\
	<div id='uiBottomLeft'>\
		<div id='speedInfoCont'>Speed: <span id='speedInfo'>___</span> km/h</div>\
		<br>\
		<div id='boostBarInfoCont'>Boost: <div id='boostBar'></div></div>\
	</div>\
	<div id='uiBottomRight'>\
		<div id='shieldsInfoCont'>Shields:\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
			<div class='shieldInfo'></div>\
		</div>\
		<br>\
		<div id='healthInfoCont'>Health:\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
			<div class='healthInfo'></div>\
		</div>\
	</div>\
	</div>";

//----------------------------------------------------------------------------------------------------
// Global Variables
//----------------------------------------------------------------------------------------------------

htmlElements = {}; //This object is populated later in the program, once the page is setup

//----------------------------------------------------------------------------------------------------
// Classes
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
// Display and Formatting Functions
//----------------------------------------------------------------------------------------------------

function clearPage() {
	removeElementById("pageLoadText");
	document.body.innerHTML += "<div id='wholeScreen'></div>";
	htmlElements.wholeScreen = document.getElementById("wholeScreen");

	htmlElements.wholeScreen.style.width = "100vw";
	htmlElements.wholeScreen.style.height = "100vh";
}
function loadUI() {
	htmlElements.wholeScreen.innerHTML = userInterface;
	htmlElements.gameArea = document.getElementById("gameArea");

	//Store ui info panels to htmlElements for access later
	
	//Grab these for use in this function only
	var gameScreen = document.getElementById("gameScreen");
	var svgCont = document.getElementById("svgCont");
	var svgArea = document.getElementById("gameArea");
	var uiBottomLeft = document.getElementById("uiBottomLeft");
	var uiBottomRight = document.getElementById("uiBottomRight");
	var uiSpeedInfoCont = document.getElementById("speedInfoCont");
	var uiBoostBarInfoCont = document.getElementById("boostBarInfoCont");
	var uiBoostBar = document.getElementById("boostBar");
	var uiShieldsInfoCont = document.getElementById("shieldsInfoCont");
	var uiShieldArray = document.getElementsByClassName("shieldInfo");
	var uiHealthInfoCont = document.getElementById("healthInfoCont");
	var uiHealthArray = document.getElementsByClassName("healthInfo");

	//Game screen and container formatting
	gameScreen.style.width = "100%";
	gameScreen.style.height = "100%";
	gameScreen.style.backgroundColor = "#87cefa"; //Sky blue

	//SVG area formatting

	svgArea.setAttribute("width", "100vw");
	svgArea.setAttribute("height", "100vh");
	svgArea.style.position = "fixed";
	svgArea.style.left = "0px";
	svgArea.style.top = "0px";

	//Bottom left UI formatting
	uiBottomLeft.style.position = "fixed";
	uiBottomLeft.style.bottom = "0px";
	uiBottomLeft.style.left = "0px";
	uiBottomLeft.style.width = String(fractionWindowWidth(8))+"px";

	//Bottom right UI formatting
	uiBottomRight.style.position = "fixed";
	uiBottomRight.style.bottom = "0px";
	uiBottomRight.style.right = "0px";
}

//----------------------------------------------------------------------------------------------------
// Game Functions
//----------------------------------------------------------------------------------------------------

function pageLoad() {
	clearPage();
	loadUI();
}

//----------------------------------------------------------------------------------------------------
// Technical Functions
//----------------------------------------------------------------------------------------------------

function removeElement(element) {
	element.parentNode.removeChild(element);
} 
function removeElementById(elementID) {
	var toRemove = document.getElementById(elementID);
	removeElement(toRemove);
}
function fractionWindowWidth(denominator) {
	return Number(window.getComputedStyle(gameScreen, null).getPropertyValue("width").slice(0, -2))/denominator;
}
function fractionWindowHeight(denominator) {
	return Number(window.getComputedStyle(gameScreen, null).getPropertyValue("height").slice(0,-2))/denominator;
}

//----------------------------------------------------------------------------------------------------
// Code Execution
//----------------------------------------------------------------------------------------------------

pageLoad();