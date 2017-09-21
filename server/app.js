const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 4001;
const index = require('./routes/index');
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server);
const getDataAndEmit = async socket => {
  try {
    socket.emit('info', {
      uptime: process.uptime(),
      cpu: process.cpuUsage()
    });
  } catch (error) {
    console.error({ error });
  }
};

let interval;
io.on('connection', socket => {
  console.log('new client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getDataAndEmit(socket), 50);

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
