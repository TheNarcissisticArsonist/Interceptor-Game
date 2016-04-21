//----------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------

var uiWidthFractionLeft = 5; //The fraction of the total screen width for the left UI element
var uiWidthFractionRight = 5; //Same, but for the right
var uiHeightFraction = 5; //The height fraction for both UI elements
var uiBoostBarCompletelyDischargedWidth = "5px"; //How wide the boost bar is at its absolute minimum (0% charge)
var uiBarWidthFraction = 20; //The width of the shield and health bars relative to the width of the ui container
var uiBarWidthToHeightRatio = 2; //The ratio between the width and height of the shield and health bars in the UI

//----------------------------------------------------------------------------------------------------
// Non-Javascript Constants
//----------------------------------------------------------------------------------------------------

var userInterface = "<div id='gameScreen'>\
	<div id='svgCont'>\
		<svg id='gameArea' width='0px' height='0px'></svg>\
	</div>\
	<div id='uiBottomLeft'>\
		<div id='speedInfoCenteringCont'>\
			<div id='speedInfoCont'><p>Speed:&nbsp;</p><span id='speedInfo'>___</span><p> km/h</p></div>\
		</div>\
		<br>\
		<div id='boostBarInfoCenteringCont'>\
			<div id='boostBarInfoCont'><p>Boost:&nbsp;</p><div id='boostBar'></div></div>\
		</div>\
	</div>\
	<div id='uiBottomRight'>\
		<div id='shieldsInfoCenteringCont'>\
			<div id='shieldsInfoCont'>\
				<p>Shields:</p>\
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
			<div id='healthInfoCont'>\
				<p>&nbsp;Health:</p>\
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
var oldPageWidth, oldPageHeight; //The program will update everything's sizing if the screen size changes

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
	//This is basically a giant-ass function that puts in all the elements and loads all the css and such

	htmlElements.wholeScreen.innerHTML = userInterface;	//Load the user interface into the webpage
	htmlElements.gameArea = document.getElementById("gameArea"); //Grab the svg game area for use later

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
	svgArea.style.position = "fixed"; //So it always stays centered across the whole screen
	svgArea.style.left = "0px";
	svgArea.style.top = "0px";

	//Bottom left UI formatting
	uiBottomLeft.style.position = "fixed";
	uiBottomLeft.style.bottom = "0px";
	uiBottomLeft.style.left = "0px";
	uiBottomLeft.style.width = String(fractionWindowWidth(uiWidthFractionLeft)) + "px"; //Set the width to the width of the whole window divided by some constant
	uiBottomLeft.style.height = String(fractionWindowHeight(uiHeightFraction)) + "px"; //Same, except for the height
	uiBottomLeft.style.textAlign = "center";
	uiSpeedInfoCenteringCont.style.width = "100%";
	uiSpeedInfoCenteringCont.style.height = "50%"; //There are two in each one, so the height of each is 50%
	uiSpeedInfoCont.style.textAlign = "center";
	uiSpeedInfoCont.style.position = "relative";
	uiSpeedInfoCont.style.top = "50%";						//For some reason, this line and the line below vertically centers some stuff
	uiSpeedInfoCont.style.transform = "translateY(-50%)";	//Oh well
	uiBoostBarInfoCenteringCont.style.width = "100%";
	uiBoostBarInfoCenteringCont.style.height = "50%";
	uiBoostBarInfoCont.style.textAlign = "center";
	uiBoostBarInfoCont.style.position = "relative";
	uiBoostBarInfoCont.style.top = "50%";
	uiBoostBarInfoCont.style.transform = "translateY(-50%)";
	uiBoostBar.style.width = uiBoostBarCompletelyDischargedWidth;
	uiBoostBar.style.backgroundColor = "#5aafe4"; //Slightly darker than sky blue
	uiBoostBar.innerHTML = "&nbsp;";

	//Bottom right UI formatting
	uiBottomRight.style.position = "fixed";
	uiBottomRight.style.bottom = "0px";
	uiBottomRight.style.right = "0px";
	uiBottomRight.style.width = String(fractionWindowWidth(uiWidthFractionRight)) + "px";
	uiBottomRight.style.height = String(fractionWindowHeight(uiHeightFraction)) + "px";
	uiBottomRight.style.textAlign = "center";
	uiShieldsInfoCenteringCont.style.width = "100%";
	uiShieldsInfoCenteringCont.style.height = "50%";
	uiShieldsInfoCont.style.textAlign = "center";
	uiShieldsInfoCont.style.position = "relative";
	uiShieldsInfoCont.style.top = "50%";
	uiShieldsInfoCont.style.transform = "translateY(-50%)";
	uiHealthInfoCenteringCont.style.width = "100%";
	uiHealthInfoCenteringCont.style.height = "50%";
	uiHealthInfoCont.style.textAlign = "center";
	uiHealthInfoCont.style.position = "relative";
	uiHealthInfoCont.style.top = "50%";
	uiHealthInfoCont.style.transform = "translateY(-50%)";
	for(var i=0; i<uiShieldArray.length; ++i) {
		uiShieldArray[i].style.border = "1px dotted black";
		uiShieldArray[i].style.width = String(Number(window.getComputedStyle(uiShieldsInfoCenteringCont, null).getPropertyValue("width").slice(0, -2))/uiBarWidthFraction) + "px"; //Set the width of each ui shield bar to a fraction of the parent
		uiShieldArray[i].style.height = String(Number(uiShieldArray[i].style.width.slice(0, -2))*uiBarWidthToHeightRatio) + "px"; //Set its height to a constant times its width
	}
	for(var i=0; i<uiHealthArray.length; ++i) {
		uiHealthArray[i].style.border = "1px dotted black";
		uiHealthArray[i].style.width = String(Number(window.getComputedStyle(uiHealthInfoCenteringCont, null).getPropertyValue("width").slice(0, -2))/uiBarWidthFraction) + "px";
		uiHealthArray[i].style.height = String(Number(uiHealthArray[i].style.width.slice(0, -2))*uiBarWidthToHeightRatio) + "px";
	}

	/*//Formatting for css debugging (comment this out when not being used)
	uiBottomLeft.style.backgroundColor = "#ffeeee";
	uiBottomRight.style.backgroundColor = "#ffeeee";
	uiSpeedInfoCont.style.backgroundColor = "#ffdddd";
	uiBoostBarInfoCont.style.backgroundColor = "#ffdddd";
	uiShieldsInfoCont.style.backgroundColor = "#ffdddd";
	uiHealthInfoCont.style.backgroundColor = "#ffdddd";*/

	oldPageWidth = window.innerWidth;
	oldPageHeight = window.innerHeight;
}
function resetUI() {
	htmlElements.wholeScreen.innerHTML = "";
	htmlElements.wholeScreen.style.height = "100vh";
	htmlElements.wholeScreen.style.width = "100vw";
	loadUI();
}
function testForWindowResize() {
	var newPageWidth = window.innerWidth;
	var newPageHeight = window.innerHeight;
	if(newPageWidth != oldPageWidth || newPageHeight != oldPageHeight) {
		resetUI();
	}
	else {
		oldPageHeight = newPageHeight;
		oldPageWidth = newPageWidth;
	}
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
var uiResize = window.setInterval(testForWindowResize, 100);