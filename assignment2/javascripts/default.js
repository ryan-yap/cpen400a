var cart = [];

var products = [];

var verbose = true;

function initializeProducts(){
	products["Box1"] =			10;
	products["Box2"] = 			10;
	products["Clothes1"] = 		10;
	products["Clothes2"] = 		10;
	products["Jeans"] = 		10;
	products["Keyboard"] = 		10;
	products["KeyboardCombo"] = 10;
	products["Mice"] = 			10;
	products["PC1"] = 			10;
	products["PC2"] = 			10;
	products["PC3"] = 			10;
	products["Tent"] = 			10;	
}

initializeProducts();

function addToCart(productName) {
    var found = false; 
	for(var i in cart){
		if(i == productName){
				cart[i]++;
				found = true;
				
				break;
		}			
	}	
	if(!found)
	{
		cart[productName] = 1; 

	}	
	
	products[productName]--;
	
	if(verbose){
		console.log("The Cart Now Contains:")
		for(var j in cart)
		{			
			console.log("ProductName:" + j + " Quantity" + cart[j]);
		}
	}
}

function removeFromCart(productName) {
	var found = false;
	for(var i in cart){
		if(productName == i){
			if(cart[i] == 1)
				delete cart[i];
			else{
				cart[i]--; 
			}
			found = true;
			products[productName]++;
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