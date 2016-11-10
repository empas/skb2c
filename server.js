'use strict';

const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = 3000;

const re = /^((https?)?:?(\/\/)?([\w-.]*)?\/)/i;

let parseUserName = (url) => {

    let username = url.replace(re, '');
    username = username.replace(/(\/.*)|(\?.*)|@/ig, '');

    return '@'+username;

};

app.use(cors());
app.get('/',(req, res) => {

    console.log('req.query');
    console.log(req.query);

    let url = req.query.username;

    res.send(parseUserName(url));

});

const server = app.listen(port);

console.log('Server is listening on port ' + port);
