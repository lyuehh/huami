#!/usr/bin/env node

var md5 = require('./md5').md5;
var fs = require('fs');
var path = require('path');
var toClipboard = require('to-clipboard');
var prompt = require('prompt');

prompt.message = 'Enter your ';
prompt.delimiter = '';
prompt.start();

function countCode(password, key){
    var md5one = md5(password,key);
    var md5two = md5(md5one,'snow');
    var md5three = md5(md5one,'kise');
    //计算大小写
    var rule = md5three.split('');
    var source = md5two.split('');
    for(var i=0;i<=31;i++){
        if(isNaN(source[i])){
            str ='sunlovesnow1990090127xykab';
            if(str.search(rule[i]) > -1){
                source[i] = source[i].toUpperCase();
            }
        }
    }
    var code32 = source.join('');
    var code1 = code32.slice(0,1);
    var code16;
    if(isNaN(code1)){
        code16 = code32.slice(0,16);
    }else{
        code16 = 'K' + code32.slice(1,16);
    }
    return code16;
}


prompt.get(['key:'], function (err, result) {
    var key = result['key:'];
    if (!key) {
        console.error('No key, exit ..');
        process.exit(0);
    }

    var file = path.join(process.env.HOME, '.huami.json');
    if (!fs.existsSync(file)) {
        console.error('~/.huami.json not exists !!');
        process.exit(2);
    }

    try {
        var config = require(file);
    } catch(e) {
        console.error('~/.huami.json file error !!');
        process.exit(3);
    }

    var result = countCode(config.password, key);
    toClipboard.sync(result);
    console.log('Copied, will clear in 10s ..');

    setTimeout(function() {
        toClipboard.sync('   ');
    }, 10000);
});

