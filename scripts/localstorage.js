var meuStorage = localStorage;



function clearAllItems(){
	saveItem("points", 0);
	saveItem("level", 0);
}

function saveItem(type, content){
	var name = "findcolor-"+type;
	localStorage.setItem(name, content);	
}


function getItem(type){
	var name = "findcolor-"+type;
	return localStorage.getItem(name);
}


function deleteItem(type){
	var name = "findcolor-"+type;
	localStorage.removeItem(name);
}

