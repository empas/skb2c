'use strict';

const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = 3000;

// const re = /((https?){0,1}:?(\/\/)?[a-z.]*[a-z]{1,}\.[a-z]{1,}\/)|(\?.*)|@|(\/.*)/ig;
// const re = /((https?){0,1}:?(\/\/)?[a-z.]*[a-z]{1,}\.[a-z]{1,}\/)|@/i;
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

    // if(!names || names.length > 3 || /[\d_/]/.test(namesStr)){
    //     console.log('Invalid fullname');
    //     res.send('Invalid fullname');
    // }else{
    //     let lastname = names.pop();
    //
    //     let modifiedName = parseName(lastname, ...names);
    //     console.log(modifiedName);
    //
    //     res.send(modifiedName.trim());
    // }
});

const server = app.listen(port);

console.log('Server is listening on port ' + port);
