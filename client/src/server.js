const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

http.listen(4000, '::', () => {
    console.log('listening on *:4000');
});

const users = {};
io.on("connection", client => {
  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    });
  });

  client.on("disconnect", () => {
    //const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});

http.listen(4000, '::', () => {
    console.log('listening on *:4000');
});

module.exports = app;
