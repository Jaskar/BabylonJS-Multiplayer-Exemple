var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var dirName = path.dirname(process.execPath);

// Open the server
var openServer = function() {
    document.getElementById("button_open").style.visibility = "hidden";

    // Init the path get
    app_get_init();

    // Init the socket.io on
    app_io_on_init();

    http.listen(80, function(){
    });

    document.getElementById("button_close").style.visibility = "visible";
};

// Close the server
var closeServer = function() {
    document.getElementById("button_close").style.visibility = "hidden";
    http.close();
    document.getElementById("button_open").style.visibility = "visible";
};