const express = require('express');

const app = express();
const axios = require('axios').default;

var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', (req, res, next) => {
    res.send('Hello World');
});

app.post('/check_phish', urlencodedParser, (req, res, next) => {
    
    // es6 example

    const params = {
        url: req.body.url,
        format: req.body.format,
        app_key: '05059fd0069a205a91b5672f38a8f930ff38f1bb45d33eef7928203d97099aed'
    };
  
    const data = Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: 'https://checkurl.phishtank.com/checkurl/',
    };

    axios(options).then((result) => {
        if(result.status === 200)
            res.end(JSON.stringify(result.data));
        else
            res.end(JSON.stringify({err: result.err}));
    });
});

app.listen(5050, () => {
    console.log('Listening on port 5050'); 
});