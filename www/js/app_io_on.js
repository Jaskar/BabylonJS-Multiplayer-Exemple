var app_io_on_init = function() {

    var clients = [];
    var playerPos = [];

    io.on('connection', function(socket){
        clients.push(socket);
        playerPos.push([1,0.5,1]);

        socket.on('move', function(args) {
            console.log(args);
            var pos = playerPos[clients.indexOf(socket)]
            if(args == 'up') {
                pos[2] += 0.5;
            } else if(args == 'down') {
                pos[2] -= 0.5;
            } else if(args == 'left') {
                pos[0] -= 0.5;
            } else if(args == 'right') {
                pos[0] += 0.5;
            }
            playerPos[clients.indexOf(socket)] = pos;
        });

        socket.on('disconnect', function() {
            playerPos.splice(clients.indexOf(socket), 1);
            clients.splice(clients.indexOf(socket), 1);
        });

        setInterval(function() {
            socket.emit('updatePositions', playerPos);
        }, 50);
    });

    setInterval(function() {
        document.getElementById('clientsConnected').innerHTML = "";
        for(client in clients) {
            document.getElementById('clientsConnected').innerHTML += client + "<br>";
        }
    }, 100);
};