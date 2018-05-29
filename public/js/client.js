var client_id;
var socket = io.connect('http://localhost:3000');
var timer;
var time;
var clockFlag = false;

if(clockFlag === false)
    $('#time').text('Bidding has not Started');

function bidClock(){
    timer = setInterval(function(){showTime()} , 1000);
}

function showTime(){
    if(time >= 0){
        $('#time').text(time + " seconds left")
        time -= 1;
        if(time == 0)
           $('#time').text("Bidding Complete") 
    }
}

socket.on('connect', function(data) {
    socket.emit('join', "Connected to Server");
});

socket.on('assign', function(data){
    client_id = data;
});

socket.on('initiate', function(data){
    $("#bid_val").text( data.old );
    $("#new_bid").text( data.new );
    time = data.time;
    if(data.flag === true && clockFlag === false){
        bidClock();
        clockFlag = true;
    }
    $('#p_name').text( data.item );
    $('#p_img').attr('src', data.addr);
});


socket.on('update', function(data) {
    $("#bid_val").text( data.old );
    $("#new_bid").text( data.new );
    clearInterval(timer);
    time = data.time;
    bidClock();
    if(data.flag === true && clockFlag === false){
        bidClock();
        clockFlag = true;
    }
});

socket.on('end', function(data){
    if(client_id == data)
        window.alert('Bidding Ended\nCongrats You Won The Bidding');
    else
        window.alert('Bidding Ended\nSorry You Lost The Bidding');
                
    clearInterval(timer);
})    

$('#send').submit(function() {
    var new_bid = Number(document.getElementById("new_bid").innerHTML);
    $('#new_bid').val('');
    socket.emit('bid', {bid:new_bid, c_id:client_id});
    return false;
});