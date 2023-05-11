var express = require('express')
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const settings = require('./settings.json');

var httpProtocol = null;
/* ***************************************************** */
/*                         HTTPS                         */
/* ***************************************************** */
if (settings.https) {
    /***********************************************/
    /*                 HTTPS server                */
    const fs = require('fs');

    const options = {
        key: fs.readFileSync(settings.keyPath),
        cert: fs.readFileSync(settings.crtPath),
        ca: fs.readFileSync(settings.caPath)
    }

    httpProtocol = require('https').Server(options, app);
    /*                 HTTPS server                */
    /***********************************************/
}


/* ***************************************************** */
/*                         HTTP                          */
/* ***************************************************** */
else {
    /***********************************************/
    /*                 HTTP server                */
    httpProtocol = require('http').Server(app);
    /*                 HTTP server                */
    /***********************************************/
}




// allow access from other services
app.use(cors());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// require('./db').query();


// set the restful API routes
require('./routes')(app);




if ('development' == app.get('env')) {
    console.log("Rejecting node tls");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}


//init the server listen
httpProtocol.listen(settings.port, function () {
    var host = settings.ip;
    var port = settings.port;

    console.log("Server listening at http://%s:%s" +new Date(), host, port);

});

