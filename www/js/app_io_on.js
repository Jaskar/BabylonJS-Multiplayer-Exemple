var app_io_on_init = function() {

    var clients = [];

    io.on('connection', function(socket){
        clients.push(socket.id);

        socket.on('getSocketId', function(onSuccess) {
            console.log(socket.id);
            onSuccess(socket.id);
        });

        socket.on('move', function(args) {

            args.name = socket.id;

            io.emit('move', args);
        });

        socket.on('disconnect', function() {
            socket.emit('disconnect', socket);
            clients.splice(clients.indexOf(socket), 1);
        });
    });

    setInterval(function() {
        document.getElementById('clientsConnected').innerHTML = "";
        for(var client in clients) {
            document.getElementById('clientsConnected').innerHTML += client + "<br>";
        }
    }, 100);
};