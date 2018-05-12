  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var bid_price = 1000;
  var next_bid = bid_price+(bid_price*0.1);

  app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/public/index.html')
  });

  app.use(express.static('public'));

  io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  		client.emit('initiate', { old:bid_price, new:next_bid })
  	});

  	client.on('bid', function(data){
  		console.log(data);
  		bid_price = Number(data);
  		next_bid = bid_price+(bid_price*0.1);
  		client.emit('update', { old:bid_price, new:next_bid });
  		client.broadcast.emit('update', { old:bid_price, new:next_bid });
  	});
  });

  server.listen(3000);

