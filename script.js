//----------------------------------------------------------------------------------------------------
//Constants
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
//Variables
//----------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
//Game Functions
//----------------------------------------------------------------------------------------------------

function pageLoad() {
	removeElementById("pageLoadText");
}

//----------------------------------------------------------------------------------------------------
//Technical Functions
//----------------------------------------------------------------------------------------------------

function removeElement(element) {
	element.parentNode.removeChild(element);
} 
function removeElementById(elementID) {
	var toRemove = document.getElementById(elementID);
	removeElement(toRemove);
}

//----------------------------------------------------------------------------------------------------
//Code Execution
//----------------------------------------------------------------------------------------------------

pageLoad();