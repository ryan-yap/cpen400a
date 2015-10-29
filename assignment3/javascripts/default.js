var cart = [];

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
			'price' : 10,
			'quantity' : 10
		},
		'Clothes1' : {
			'price' : 10,
			'quantity' : 10
		},
		'Clothes2' : {
			'price' : 10,
			'quantity' : 10
		},
		'Jeans' : {
			'price' : 10,
			'quantity' : 10
		},
		'Keyboard' : {
			'price' : 10,
			'quantity' : 10
		},
		'KeyboardCombo' : {
			'price' : 10,
			'quantity' : 10
		},
		'Mice' : {
			'price' : 10,
			'quantity' : 10
		},
		'PC1' : {
			'price' : 10,
			'quantity' : 10
		},
		'PC2' : {
			'price' : 10,
			'quantity' : 10
		},
		'PC3' : {
			'price' : 10,
			'quantity' : 10
		},
		'Tent' : {
			'price' : 10,
			'quantity' : 10
		},
    };
}

initializeProducts();

function addToCart(productName) {
	inactiveTime = 0
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
			cart[productName] = 1; 
		}		
		products[productName].quantity--;
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
}

function removeFromCart(productName) {
	inactiveTime = 0
	var found = false;
	for(var i in cart){
		if(productName == i){
			if(cart[i] == 1)
				delete cart[i];
			else{
				cart[i]--; 
			}
			found = true;
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
}

var showItem = (function () {
    var counter = 0;
    return function () {
    	if(counter < Object.keys(cart).length){
    		alert(Object.keys(cart)[counter] + " Quantity :" + cart[Object.keys(cart)[counter]]);
    		counter++;
    	}else{
    		isShowingCart = false;
    		counter = 0;
    		alert("Hey there! Are you still planning to buy something?");
    	}
    }
})();

function startTimer(){
	inactiveTime = 0
	var timer = setInterval( function(){
	if (inactiveTime < 3){
		inactiveTime++;
		console.log(inactiveTime)
	}else{
		if(!isShowingCart){
			alert("Hey there! Are you still planning to buy something?");
		}else{
			showItem();
		}
		clearInterval(timer);
		startTimer()
	}}, 1000)
}

function showCart(){
	isShowingCart = true
	inactiveTime = 0
}

window.onload = function () {
    startTimer();
};