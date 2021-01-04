const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

require('dotenv').config();

// connect db
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('Db connected'));

// initialize server 
const app = express();
const server = require('http').Server(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
}
);

server.listen(process.env.PORT);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/admin', require('./routes/admin'))

// middleware
io.of('/').on('connect', (socket) => {
    socket.emit('connect-done', {msg: 'Connected'})
    app.use('/user', [socketMiddleware(socket), require('./routes/user')])
})

// socket 


const socketMiddleware = (socket) => ((req, res, next) => {
    req.socket = socket;
    next();
})

