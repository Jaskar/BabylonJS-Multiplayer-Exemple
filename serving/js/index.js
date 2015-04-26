var onKeyDown;
var initialize = function() {
    var socket = io();

    // Get the canvas element from our HTML below
    var canvas = document.getElementById("gameCanvas");

    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    //scene.clearColor = new BABYLON.Color3(0.2, 0.05, 0.3);

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

    var ground = BABYLON.Mesh.CreateGround(
        "myGround_1",
        50,
        50,
        50,
        scene
    );
    ground.visibility = true;

    var boxes = [];
    var box = BABYLON.Mesh.CreateBox(
        "myBox_1",
        1,
        scene
    );
    box.position = new BABYLON.Vector3(0,0.75,0)

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        box.rotation.x += 0.02 * scene.getAnimationRatio();
        box.rotation.y += 0.02 * scene.getAnimationRatio();
        box.rotation.z += 0.01 * scene.getAnimationRatio();

        scene.render();
    });

    socket.on('connect', function() {
        //socket.emit('name', var);
    });
    socket.on('updatePositions', function(positions) {

        for(var i = 0; i < boxes.length; i++) {
            boxes[i].dispose();
        }
        boxes = [];
        for(var i = 0; i < positions.length; i++) {
            boxes.push(BABYLON.Mesh.CreateBox(
                "box" + i.toString(),
                1,
                scene
            ));

            boxes[boxes.length-1].position = new BABYLON.Vector3(
                positions[i][0],
                positions[i][1],
                positions[i][2]
            );
        }
    });

    var moveLeft = function() {
        socket.emit('move', 'left');
    };
    var moveRight = function() {
        socket.emit('move', 'right');
    };
    var moveUp = function() {
        socket.emit('move', 'up');
    };
    var moveDown = function() {
        socket.emit('move', 'down');
    };

    document.getElementById('buttonLeft').onclick = moveLeft;
    document.getElementById('buttonRight').onclick = moveRight;
    document.getElementById('buttonUp').onclick = moveUp;
    document.getElementById('buttonDown').onclick = moveDown;
};

document.addEventListener("DOMContentLoaded", function() {
    initialize();
});