//----------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
// Non-Javascript Constants
//----------------------------------------------------------------------------------------------------

var userInterface = "<div id='gameScreen'>\
	<div id='svgCont'>\
		<svg id='gameArea'></svg>\
	</div>\
	<div id='uiBottomLeft'>\
		<div id='dummyInfo1Cont'>Info: <span id='dummyInfo1'>___</span></div>\
	</div>\
	<div id='uiBottomRight'>\
		<div id='dummyInfo2Cont'>Info: <span id='dummyInfo2'>___</span></div>\
	</div>\
	</div>";

//----------------------------------------------------------------------------------------------------
// Global Variables
//----------------------------------------------------------------------------------------------------

htmlElements = {};

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
	
	gameScreen = document.getElementById("gameScreen");
	uiBottomLeft = document.getElementById("uiBottomLeft");
	uiBottomRight = document.getElementById("uiBottomRight");
	dummyInfo1Cont = document.getElementById("dummyInfo1Cont");
	dummyInfo2Cont = document.getElementById("dummyInfo2Cont");

	gameScreen.style.width = "100%";
	gameScreen.style.height = "100%";
	gameScreen.style.backgroundColor = "#000000";
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

//----------------------------------------------------------------------------------------------------
// Code Execution
//----------------------------------------------------------------------------------------------------

pageLoad();