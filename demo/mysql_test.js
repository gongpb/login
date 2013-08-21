/**
 * 连接mysql测试
 */
var http = require('http');
var mysql = require('mysql');
var conn = null;  
	
   TEST_DATABASE = "nodejs_test";
   TEST_TABLE = "user_msg";
	
	var db_options = {  
		    host: 'localhost',  
		    port: 3306,  
		    user: 'root',  
		    password: 'admin'  
		};  
	conn = mysql.createConnection(db_options);  
	conn.connect(function(err) {  
		        if(err) {  
		            console.error('connect db ' + client.host + ' error: ' + err);  
		            process.exit();  
		        }  
		    });  

conn.query('create database '+TEST_DATABASE);

conn.query("use "+TEST_DATABASE);

conn.query('create table '+TEST_TABLE +
		"(id INT(11) AUTO_INCREMENT, name varchar(255), primary key (id) )");

conn.query("insert into "+TEST_TABLE+"(name) values ('nodejs_1')");

conn.query("insert into "+TEST_TABLE+"(name) values ('nodejs_2')");


	conn.query("select * from  " +TEST_TABLE,function select(err,results,fields){
	if(err){
		throw err;
	}
	console.log(err);
	console.log(results);
	console.log(fields);
});
