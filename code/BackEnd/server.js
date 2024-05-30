var app = require('./controller/app')
var hostname = "localhost"
var port = 8081;

const https = require('https');
const fs = require('fs');
const path = require('path');

const httpsServer = https.createServer( 
    { 
        key: fs.readFileSync(path.join(__dirname, 
            "..", "certificates", "key.pem")), 
        cert: fs.readFileSync(path.join(__dirname, 
            "..", "certificates", "cert.pem")), 
    }, 
    app 
) 
  
httpsServer.listen(port, () => { 
    console.log(`HTTPS server up at https://${hostname}:${port}`) 
})

// app.listen(port, hostname, function () {
//     console.log(`Server hosted at http://${hostname}:${port}`)
// })

