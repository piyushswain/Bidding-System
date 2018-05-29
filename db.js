
// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port     : 3306
    });
    
var app = express();
var result;
// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS bidding', function (err) {
    if (err) throw err;
    connection.query('USE bidding', function (err) {
        if (err) throw err;
        result = connection.query('create table if not exists items('
                    		 +    'id int primary key auto_increment,'
                    		 +    'name varchar(20),'
                     		 +    'picture varchar(50),'
                     		 +    'price varchar(20),'
                     		 +  	 ');', function (err) {
                if (err) throw err;
        });
    });
});

console.log(result);