#!/usr/bin/env node
const command = require('commander');
require('colors');
command
    .usage(`${'-p'.green} 80 ${'-d'.green} 192.168.1.123`)
    .version('0.0.1')
    .option('-p, --port [port]', 'config port')
    .option('-d, --domain [domain]', 'config domain')
    .parse(process.argv);

let { port, domain } = command;

if (port && domain) {
    const WebSocket = require('ws');
    const uri = `ws://${domain}:${port}`;
    console.log('debug on:', uri);
    const ws = new WebSocket(uri);

    ws.on('open', function open() {
        console.log('[debugger]', 'open');
    });

    ws.on('message', function (message) {
        console.log('[debugger]'.cyan, message.toString().red);
    });
    ws.on('close', function (err) {
        console.error(err);
    })
} else {
    command.help();
}
