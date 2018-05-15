//Require Variables  
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var events = require('events');
  var emitter = new events.EventEmitter();
  
//Functional Variables
  var bid_price = 500;
  var next_bid = bid_price+(bid_price*0.1);
  var bid_start = false;
  var time = 60;
  var timer;
  var highest_bidder;

  function startBid(){
  timer = setInterval(function(){
  			  showTime()} , 1000);
  }

  function showTime(){
  	time -= 1;
  	console.log(time);
  	if(time == 0)
  		emitter.emit('end');
  }

  app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/public/index.html')
  });

  app.use(express.static('public'));

  io.on('connection', function(client) {
  	console.log('Client connected...'+client.id);
  	client.emit('assign',client.id);

  	client.on('join', function(data) {
  		console.log(data);
  		client.emit('initiate', { old:bid_price, new:next_bid})
  	});

  	client.on('bid', function(data){
  		if(bid_start == false)
  			startBid();
  		bid_start = true;

  		console.log(data);
  		highest_bidder = data.c_id;
  		bid_price = Number(data.bid);
  		next_bid = Math.round(bid_price+(bid_price*0.1));
  		client.emit('update', { old:bid_price, new:next_bid });
  		client.broadcast.emit('update', { old:bid_price, new:next_bid });
  	});

  	emitter.on('end',function(){
  		client.emit('end',highest_bidder);
  		clearInterval(timer)});
  });

  server.listen(3000);

