//=====================================================================
// This sample demonstrates using TeslaJS
//
// https://github.com/mseminatore/TeslaJS
//
// Copyright (c) 2016 Mark Seminatore
//
// Refer to included LICENSE file for usage rights and restrictions
//=====================================================================

var tjs = require('../TeslaJS');
var fs = require('fs');
var colors = require('colors');
var program = require('commander');

program
  .usage('[options] username password')
  .option('-U, --uri [string]', 'URI of test server (e.g. http://127.0.0.1:3000)')
  .parse(process.argv);

//
//
//
function login_cb(result) {
    if (result.error) {
        console.log(JSON.stringify(result.error).red);
        process.exit(1);
    }

    var token = JSON.stringify(result.authToken);

    if (token) {
        console.log("Login " + "Successfull.".green);
        //    console.log("OAuth token is: " + token.green);

        fs.writeFileSync('.token', token, 'utf8');
        console.log('Auth token saved!');
    }
}

if (program.args.length < 2)
    program.help();

var username = program.args[0];
var password = program.args[1];

if (program.uri) {
    console.log("Setting portal URI to: " + program.uri);
    tjs.setPortalBaseURI(program.uri);
}

tjs.login(username, password, login_cb);
