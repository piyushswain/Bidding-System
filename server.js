//Require Variables  
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var events = require('events');
  var emitter = new events.EventEmitter();
  var mysql = require('mysql');

  //SQL Database Connection
  var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'bidding',
    }
  );

  connection.connect();
  
//Functional Variables
  var item_name; 
  var pic_addr;
  var bid_price;							//Bid Start Value
  var next_bid;									//Initial Next Bid Value (10% increment) 
  var bid_start = false;						//Flag for Timer
  var time = 60;								//Time Limit for Bidding (sec)
  var timer;									//Interval Function Variable
  var highest_bidder;							//Variable to store Client Id of highest bidder

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
  
  connection.query('SELECT * from items where id = 1', function(err, rows, fields){		//SQL Query to fetch from database
  		if (err)throw err;
  		for(var i in rows){
			item_name = rows[i].name;
			pic_addr = rows[i].picture;	
			bid_price = Number(rows[i].price);
			next_bid = bid_price+(bid_price*0.1);
		}
  		console.log(item_name + pic_addr + bid_price);
  });



  app.get('/', function(req, res, next) {					//get html file
  	res.sendFile(__dirname + '/public/index.html')
  });

  app.use(express.static('public'));						//set public directory

  io.on('connection', function(client) {					//on connection event
  	
  	console.log('Client connected...'+client.id);
  	client.emit('assign',client.id);

  	client.on('join', function(data) {
  		console.log(data);
  		client.emit('initiate', { old:bid_price, new:next_bid, time:time, flag:bid_start, addr: pic_addr, name: item_name});
  	});

  	client.on('bid', function(data){
  		if(bid_start == false)
  			startBid();
  		bid_start = true;

  		console.log(data);
  		highest_bidder = data.c_id;
  		bid_price = Number(data.bid);
  		next_bid = Math.round(bid_price+(bid_price*0.1));
  		client.emit('update', { old:bid_price, new:next_bid, time:time, flag:bid_start});
  		client.broadcast.emit('update', { old:bid_price, new:next_bid, time:time, flag:bid_start});
  	});

  	emitter.on('end',function(){
  		client.emit('end',highest_bidder);
  		clearInterval(timer)});
  });

  server.listen(3000);
