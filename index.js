const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

// Initialize Express
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('send name', (user) => {
        io.emit('send name', user);
    });

    socket.on('send message', (chat) => {
        io.emit('send message', chat);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});
