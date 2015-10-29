var cart = [];
cart.total = 0; 

var products = [];

var verbose = false;

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
			document.getElementById(productName).getElementsByClassName('removeButton')[0].style.display = "inline"
			cart[productName] = 1; 
		}		
		products[productName].quantity--;
		cart.total += products[productName].price; 
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
			if(cart[i] == 1){
				delete cart[i];
				document.getElementById(productName).getElementsByClassName('removeButton')[0].style.display = "none";				
			}				
			else{
				cart[i]--; 				
			}
			found = true;
			cart.total -= products[productName].price; 
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
})();

function startTimer(){
	inactiveTime = 0
	var timer = setInterval( function(){
	if (inactiveTime < 3){
		inactiveTime++;	
		console.log(inactiveTime)
	}else{
		if(!isShowingCart){
			if(verbose){
			alert("Hey there! Are you still planning to buy something?");
			}
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
	timeoutElement = document.getElementById("timeout");
	cartElement = document.getElementById("showCart")
    startTimer();
};

cart.watch('total', function (id, oldval, newval) {
  cartElement.innerHTML = "Cart ($" + newval + ")"; 
  return newval;
});

window.watch('inactiveTime',function(id, oldval, newval) {
	console.log("The current timeout value is " + newval + '!')
	timeoutElement.innerHTML = "The current timeout value is " + newval + '!'; 
	return newval;
});
