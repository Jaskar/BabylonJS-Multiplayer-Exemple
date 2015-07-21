var onKeyDown;
var players = [];
var myName = null;
var mySocketId = null;

var initialize = function() {
    var socket = io();

    // Get the canvas element from our HTML below
    var canvas = document.getElementById("gameCanvas");

    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    var camera = new BABYLON.FreeCamera(
        "myCamera",
        new BABYLON.Vector3(0,10,-20),
        scene
    );
    camera.rotation.x += 0.45;

    var light = new BABYLON.HemisphericLight(
        "myHemisphericLight_1",
        new BABYLON.Vector3(0,50,0),
        scene
    );
    light.diffuseColor = new BABYLON.Color3(1,1,1);
    light.emissiveColor = new BABYLON.Color3(1,1,1);
    light.intensity = 0.85;

    var ground = BABYLON.Mesh.CreateGround(
        "myGround_1",
        50,
        50,
        50,
        scene
    );
    ground.visibility = true;

    var refBox = BABYLON.Mesh.CreateBox(
        "refBox",
        0.45,
        scene
    );
    refBox.position = new BABYLON.Vector3(0,0.75,0)


    var move = null;
    // When a key is pressed, set the movement
    var onKeyDown = function(evt) {
        if (evt.keyCode == 37) {
            move = 'left';
        }
        else if (evt.keyCode == 38) {
            move = 'up';
        }
        else if (evt.keyCode == 39) {
            move = 'right';
        }
        else if (evt.keyCode == 40) {
            move = 'down';
        }
    };

    // On key up, reset the movement
    var onKeyUp = function(evt) {
        move = null;
    };

    // Register events with the right Babylon function
    BABYLON.Tools.RegisterTopRootEvents([{
        name: "keydown",
        handler: onKeyDown
    }, {
        name: "keyup",
        handler: onKeyUp
    }]);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {

        if(move) {
            if(move == 'left') {
                players[mySocketId].position.x -= 0.1;
            }
            else if(move == 'right') {
                players[mySocketId].position.x += 0.1;
            }
            else if(move == 'up') {
                players[mySocketId].position.z += 0.1;
            }
            else if(move == 'down') {
                players[mySocketId].position.z -= 0.1;
            }
        }

        refBox.rotation.x += 0.02 * scene.getAnimationRatio();
        refBox.rotation.y += 0.02 * scene.getAnimationRatio();
        refBox.rotation.z += 0.01 * scene.getAnimationRatio();

        scene.render();
    });

    var _this = this;

    socket.emit('getSocketId', function(myId) {

        players[myId] = BABYLON.Mesh.CreateBox(
            "me_" + myId,
            1,
            scene
        );
        players[myId].position = new BABYLON.Vector3(0,0.51,0);

        mySocketId = myId;


        setInterval(function() {
            var data = {};

            data.posX = players[mySocketId].position.x;
            data.posY = players[mySocketId].position.y;
            data.posZ = players[mySocketId].position.z;

            socket.emit('move', data);
        }, 40);
    });

    socket.on('disconnect', function(socket) {
        if(players[socket]) {
            players[socket].destroy();
            players[socket] = null;
        }
    });

    socket.on('move', function(args) {
        var name = args.name;

        console.log(players[name]);

        if(players[name] != undefined) {
            players[name].position.x = args.posX;
            players[name].position.y = args.posY;
            players[name].position.z = args.posZ;
        }
        else {
            console.log('New player');

            var newPlayer = (BABYLON.Mesh.CreateBox(
                "player_" + name,
                1,
                scene
            ));
            newPlayer.position.x = args.posX;
            newPlayer.position.y = args.posY;
            newPlayer.position.z = args.posZ;

            players[name] = newPlayer;
        }
    });
};

document.addEventListener("DOMContentLoaded", function() {
    initialize();
});