var app_get_init = function() {

    // Base path
    app.get('/', function(req, res){
        res.sendFile(path.join(dirName, "serving", "index.html"));
    });

    /*************** HTML ***************/



    /************* End HTML *************/

    /**************** JS ****************/

    // jQuery
    app.get('/js/jQuery_1.11.1.js', function(req, res) {
        res.sendFile(path.join(dirName, "serving", "js", "jQuery_1.11.1.js"));
    });

    // Socket.io
    app.get('/js/socket.io_1.2.0.js', function(req, res) {
        res.sendFile(path.join(dirName, "serving", "js", "socket.io_1.2.0.js"));
    });

    // Babylon.2.0
    app.get('/js/babylon.2.0.js', function(req, res) {
        res.sendFile(path.join(dirName, "serving", "js", "babylon.2.0.js"));
    });

    // index.js
    app.get('/js/index.js', function(req, res) {
        res.sendFile(path.join(dirName, "serving", "js", "index.js"));
    });

    /************** End JS **************/

    /**************** CSS ***************/

    // Index
    app.get('/css/index.css', function(req, res) {
        res.sendFile(path.join(dirName, "serving", "css", "index.css"));
    });

    /************* End CSS **************/
};