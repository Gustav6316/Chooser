const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 4000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:4000",
        credentials: true
    }
});

const counter = 0;

// Connection Event von Socket.io
io.on('connection', (socket) => {
    console.log('New connection!');

    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser( { id: socket.id, username, room } );

        if (error) {
            return callback(error);
        }

        socket.join(user.room);                                                                     // Beitritt in den Room
        console.log({ room: user.room, users: getUsersInRoom(user.room) });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });   // Übermitteln der User and den Raum
    });

    socket.on('ready', ({ username, room }, callback) => {
        if (error) return callback(error);
        
        counter + 1;
        console.log(`${username} ist ready`);

        if (counter === getUsersInRoom.length) {
            io.to(room).emit('allReady')
        }
    })
    // Entfernt User aus dem Raum wenn er diesen verlässt
    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log('User left');
    });
});

app.use(router);

server.listen(PORT, '::', () => console.log(`Server started on port ${PORT}`));

