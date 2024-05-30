const express = require('express');
const serveStatic = require('serve-static');

const https = require('https');
const fs = require('fs');
const path = require('path');

var hostname = "localhost";
var port = 3001;

var app = express();

app.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if (req.method != "GET") {
        res.type('.html');
        var msg = "<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    } else {
        next();
    }
});

app.use(serveStatic(__dirname + "/public"));

const httpsServer = https.createServer( 
    { 
        key: fs.readFileSync(path.join(__dirname, 
            "..", "certificates", "key.pem")), 
        cert: fs.readFileSync(path.join(__dirname, 
            "..","certificates", "cert.pem")), 
    }, 
    app 
) 
  
httpsServer.listen(port, () => { 
    console.log(`HTTPS server up at https://${hostname}:${port}`) 
})

// app.listen(port, hostname, function () {

//     console.log(`Server hosted at http://${hostname}:${port}`);
// });
