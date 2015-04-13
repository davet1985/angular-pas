var express = require('express');
var app = express();

port = process.env.PORT || 8000;

app.use('/public', express.static('public'));
app.use('/app', express.static('app'));

app.use(require('prerender-node').set('prerenderToken', '5QUDyBsGmfyDFqVugAQ2'));

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.listen(port);

console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");