var cart = [];
cart.total = 0; 

var products = [];

var verbose = true;

var inactiveTime = 0;

var isShowingCart = false;


function initializeProducts(){	
	products = {
		'Box1' : {
			'price' : 10,
			'quantity' : 10
		},
		'Box2' : {
			'price' : 5,
			'quantity' : 10
		},
		'Clothes1' : {
			'price' : 20,
			'quantity' : 10
		},
		'Clothes2' : {
			'price' : 30,
			'quantity' : 10
		},
		'Jeans' : {
			'price' : 50,
			'quantity' : 10
		},
		'Keyboard' : {
			'price' : 20,
			'quantity' : 10
		},
		'KeyboardCombo' : {
			'price' : 40,
			'quantity' : 10
		},
		'Mice' : {
			'price' : 20,
			'quantity' : 10
		},
		'PC1' : {
			'price' : 350,
			'quantity' : 10
		},
		'PC2' : {
			'price' : 400,
			'quantity' : 10
		},
		'PC3' : {
			'price' : 300,
			'quantity' : 10
		},
		'Tent' : {
			'price' : 100,
			'quantity' : 10
		},
    };
}

initializeProducts();

function addToCart(productName) {
	inactiveTime = 0
	timeoutElement.innerHTML = "The current timeout value is " + inactiveTime + '!';
	console.log("Adding To Cart")
    var found = false; 
    if(products[productName].quantity > 0){
		for(var i in cart){
			if(i == productName ){
					cart[i]++;
					found = true;		
					break;
			}
		}	
		if(!found){
			document.getElementById(productName).getElementsByClassName('removeButton')[0].style.display = "inline"
			cart[productName] = 1; 
		}		
		products[productName].quantity--;
		cart.total += products[productName].price; 
		cartElement.innerHTML = "Cart ($" + cart.total + ")"; 
	}
	else{
		alert("This item is not in stock you cannot add it to your cart");
	}
	if(verbose){
		console.log("The Cart Now Contains:")
		for(var j in cart)
		{			
			console.log("ProductName:" + j + " Quantity" + cart[j]);
		}
	}
	configTable();
}

function removeFromCart(productName) {
	inactiveTime = 0
	timeoutElement.innerHTML = "The current timeout value is " + inactiveTime + '!';	
	var found = false;
	for(var i in cart){
		if(productName == i){
			if(cart[i] == 1){
				delete cart[i];
				document.getElementById(productName).getElementsByClassName('removeButton')[0].style.display = "none";				
			}				
			else{
				cart[i]--; 				
			}
			found = true;
			cart.total -= products[productName].price; 
			cartElement.innerHTML = "Cart ($" + cart.total + ")"; 
			products[productName].quantity++;
		}
	}	
	if(!found){
		alert("This Item Is Not In Your Cart!")
	}	
	if(verbose){
		console.log("The Cart Now Contains:")
		for(var j in cart)
		{
			console.log("ProductName:" + j + " Quantity" + cart[j]);
		}
	} 
	configTable();
}

/*var showItem = (function () {
    var counter = 1;
    return function () {
    	if(counter < Object.keys(cart).length){
    		alert(Object.keys(cart)[counter] + " Quantity :" + cart[Object.keys(cart)[counter]]);
    		if(++counter < Object.keys(cart).length){}
			else{
				isShowingCart = false;
				counter = 1;
			}			
    	}
    }
})(); */

function startTimer(){
	inactiveTime = 0
	timeoutElement.innerHTML = "The current timeout value is " + inactiveTime + '!'; 
	var timer = setInterval( function(){
	if (inactiveTime < 299){
		inactiveTime++;	
		timeoutElement.innerHTML = "The current timeout value is " + inactiveTime + '!'; 
		console.log(inactiveTime)
	}else{
		if(verbose){
			alert("Hey there! Are you still planning to buy something?");
		}		
		clearInterval(timer);
		startTimer()
	}}, 1000)
}

function showCart(){
	//isShowingCart = true
	inactiveTime = 0
	toggleOverlay();	
}

// Method to reload a table. 
function configTable(){
	// Getting the table node
	var table = document.getElementById("cartItems");

	// Clearing everything inside the table
	table.innerHTML = "";

	//Iterate through items in the cart, and print stuffs inside the table
	for(var j in cart){
		if (j != "total"){
			var row = table.insertRow(0);
	    	var cell1 = row.insertCell(0);
	    	var cell2 = row.insertCell(1);
	    	var cell3 = row.insertCell(2);
	    	var cell4 = row.insertCell(3);
	    	var cell5 = row.insertCell(4);
	    	cell1.innerHTML = j;
	    	cell2.innerHTML = cart[j];
	    	price = parseInt(products[j].price)
	    	quantity = parseInt(cart[j])
	    	cell3.innerHTML = (price*quantity).toString()
	    	cell4.innerHTML = '<button onclick=\'addToCart("'+ j +'")\'>+</button>'
	    	cell5.innerHTML = '<button onclick=\'removeFromCart("'+ j +'")\'>-</button>'
    	}else{
    		var row = table.insertRow(0);
	    	var cell1 = row.insertCell(0);
	    	var cell2 = row.insertCell(1);
	    	var cell3 = row.insertCell(2);
	    	cell1.innerHTML = j;
	    	cell3.innerHTML = cart[j];
    	}
	}

	// Adding titles for every single columns
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	cell1.innerHTML = "<strong>Product Name</strong>"
	cell2.innerHTML = "<strong>Quantity</strong>"
	cell3.innerHTML = "<strong>Price</strong>"
}

function toggleOverlay(){
	overlay.style.opacity = .8;
	if(overlay.style.display == "block"){
		overlay.style.display = "none";
		overlayContent.style.display = "none";
	} else {
		overlay.style.display = "block";
		overlayContent.style.display = "block";
	}
	
	configTable();
}

function keyEvent(e) {
	if(e.keyCode == 27 && overlay.style.display == "block"){
		overlay.style.display = "none";
		overlayContent.style.display = "none";
	}
    // gets called when any of the keyboard events are overheard
}

window.addEventListener("keypress", keyEvent, false);



window.onload = function () {
	timeoutElement = document.getElementById("timeout");
	cartElement = document.getElementById("showCart");
	overlay = document.getElementById('overlay');
	overlayContent = document.getElementById('overlayContent');
	overlayProducts = document.getElementById('overlayProducts');
    startTimer();
};
