const express = require("express");
const { createServer } = require('node:http');
const { Server } = require('socket.io')
const { join } = require("node:path");

const app = express();
const server = createServer(app);
const io = new Server(server);
// mounting express server to -> http-server to -> socket.io server


//middlewares
app.use(require('cors')());


//HOME Page call
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));

})

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

io.on('connection', (socket) => {
    console.log('a user connected with id', socket.id);
    socket.on("chat-message", (message) => {
        console.log("Message : ", message);
        io.emit("Allmessage", message);
    })
});

//server initialising listener
server.listen(3000, () => {
    console.log("Server running on port : 3000");
});