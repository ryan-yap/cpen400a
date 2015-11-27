var express = require('express')
var app = express()
var bookstore_db = require('mongoskin').db('mongodb://107.170.135.173:27017/bookstore');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var path = require('path');

// viewed at http://localhost:8080
app.use('/', express.static('static'));

app.get('/products', function(request, response) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  bookstore_db.collection('products').find().toArray(function(err, result) {
    var retObj = {};
    for (var i in result){
      console.log(result[i])
      retObj[result[i].name] = {
        price : result[i].price,
        quantity : result[i].quantity,
        url : result[i].url
      }
    }
    console.log(retObj);
    response.json(retObj);
  });  
})

app.post('/checkout', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var cart = response.body
  console.log(cart)
  //TODO: 
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
