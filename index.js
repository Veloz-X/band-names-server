const express = require('express');
require('dotenv').config();
const path = require('path');

//APP EXPRESS
const app = express();

//Node Server
const server = require('http').Server(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

//PATH PUBLIC
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server is running on port:',process.env.PORT);
});