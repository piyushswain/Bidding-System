  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var bid_price = "1000"

  app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/public/index.html')
  });

  app.use(express.static('public'));

  io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  		client.emit('initiate', bid_price)
  	});

  	client.on('bid', function(data){
  		bid_price = data;
  		client.emit('update', data);
  		client.broadcast.emit('update', data);
  	});
  });

  server.listen(3000);

