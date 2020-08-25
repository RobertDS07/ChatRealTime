const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', {msg, id: socket.id})
        console.log(msg);
    })
})

http.listen(8081, () => console.log('sv on'))