var express = require("express");
var app = express();

//设置为静态目录
app.use( express.static('projectDev') );

app.listen( 2345,function(){
    console.log( "电商网站 2345,已经启动" );
} );