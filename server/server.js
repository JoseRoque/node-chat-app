const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 5000;
const app = express();

const server =  http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',  {
    from: 'Admin',
    text: 'welcome to chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage',  {
    from: 'Admin',
    text: 'new user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`)
});
