'use strict';

const express = require('express');
const cors    = require('cors');
const app     = express();
const port    = 3000;

const re = /\S{1,}/ig;

let parseName = (lastname, ...rest) => {

    let cuttedNames = rest.map((name) => {
        let initial = name[0].toUpperCase()+'.';
        return initial;
    });
    let tmpLastname = lastname[0].toUpperCase() + lastname.substr(1).toLowerCase();
    let modName = `${tmpLastname} ${cuttedNames.join(' ')}`;

    return modName;

};

app.use(cors());
app.get('/',(req, res) => {

    console.log('req.query');
    console.log(req.query);

    // let namesStr = req.query.fullname.replace(/\d/g,'');
    let namesStr = req.query.fullname;
    let names = namesStr.match(re);
    // console.log(names);

    if(!names || names.length > 3 || /[\d_/]/.test(namesStr)){
        console.log('Invalid fullname');
        res.send('Invalid fullname');
    }else{
        let lastname = names.pop();

        let modifiedName = parseName(lastname, ...names);
        console.log(modifiedName);

        res.send(modifiedName.trim());
    }
});

const server = app.listen(port);

console.log('Server is listening on port ' + port);
