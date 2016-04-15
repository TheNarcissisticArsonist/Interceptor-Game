//----------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------

var uiWidthFractionLeft = 8; //The fraction of the total screen width for the left UI element
var uiWidthFractionRight = 8; //Same, but for the right
var uiHeightFraction = 5; //The height fraction for both UI elements
var uiBoostBarCompletelyDischargedWidth = "5px";

//----------------------------------------------------------------------------------------------------
// Non-Javascript Constants
//----------------------------------------------------------------------------------------------------

var userInterface = "<div id='gameScreen'>\
	<div id='svgCont'>\
		<svg id='gameArea' width='0px' height='0px'></svg>\
	</div>\
	<div id='uiBottomLeft'>\
		<div id='speedInfoCenteringCont'>\
			<div id='speedInfoCont'>Speed: <span id='speedInfo'>___</span> km/h</div>\
		</div>\
		<br>\
		<div id='boostBarInfoCenteringCont'>\
			<div id='boostBarInfoCont'>Boost: <div id='boostBar'></div></div>\
		</div>\
	</div>\
	<div id='uiBottomRight'>\
		<div id='shieldsInfoCenteringCont'>\
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
		</div>\
		<br>\
		<div id='healthInfoCenteringCont'>\
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
	var uiSpeedInfoCenteringCont = document.getElementById("speedInfoCenteringCont");
	var uiBoostBarInfoCont = document.getElementById("boostBarInfoCont");
	var uiBoostBarInfoCenteringCont = document.getElementById("boostBarInfoCenteringCont");
	var uiBoostBar = document.getElementById("boostBar");
	var uiShieldsInfoCont = document.getElementById("shieldsInfoCont");
	var uiShieldsInfoCenteringCont = document.getElementById("shieldsInfoCenteringCont");
	var uiShieldArray = document.getElementsByClassName("shieldInfo");
	var uiHealthInfoCont = document.getElementById("healthInfoCont");
	var uiHealthInfoCenteringCont = document.getElementById("healthInfoCenteringCont");
	var uiHealthArray = document.getElementsByClassName("healthInfo");

	//Game screen and container formatting
	gameScreen.style.width = "100%";
	gameScreen.style.height = "100%";
	gameScreen.style.backgroundColor = "#a7eeff"; //Sky blue

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
	uiBottomLeft.style.width = String(fractionWindowWidth(uiWidthFractionLeft)) + "px";
	uiBottomLeft.style.height = String(fractionWindowHeight(uiHeightFraction)) + "px";
	uiBottomLeft.style.textAlign = "center";
	uiSpeedInfoCenteringCont.style.width = "100%";
	uiSpeedInfoCenteringCont.style.height = "50%";
	uiSpeedInfoCont.style.textAlign = "center";
	uiSpeedInfoCont.style.position = "relative";
	uiSpeedInfoCont.style.top = "50%";
	uiSpeedInfoCont.style.transform = "translateY(-50%)";
	uiBoostBarInfoCenteringCont.style.width = "100%";
	uiBoostBarInfoCenteringCont.style.height = "50%";
	uiBoostBarInfoCont.style.textAlign = "center";
	uiBoostBarInfoCont.style.position = "relative";
	uiBoostBarInfoCont.style.top = "50%";
	uiBoostBarInfoCont.style.transform = "translateY(-50%)";
	uiBoostBar.style.width = uiBoostBarCompletelyDischargedWidth;
	uiBoostBar.style.backgroundColor = "#5aafe4"; //Slightly darker than sky blue
	uiBoostBar.innerHTML = "&nbsp;";

	/*//Bottom right UI formatting
	uiBottomRight.style.position = "fixed";
	uiBottomRight.style.bottom = "0px";
	uiBottomRight.style.right = "0px";
	uiBottomRight.style.width = String(fractionWindowWidth(uiWidthFractionRight))+"px";
	uiBottomRight.style.height = String(fractionWindowHeight(uiHeightFraction)) + "px";
	uiBottomRight.style.textAlign = "center";
	uiShieldsInfoCont.style.height = String(Number(window.getComputedStyle(uiBottomRight, null).getPropertyValue("height").slice(0, -2))*0.4) + "px";
	uiHealthInfoCont.style.height = String(Number(window.getComputedStyle(uiBottomRight, null).getPropertyValue("height").slice(0, -2))*0.4) + "px";*/
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