const io = require('socket.io')(5000, {
    cors: {
        origin: ["http://192.168.1.36:3000", "http://localhost:3000"]
    }
})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on('message', (message) => {
        socket.broadcast.emit('recieve-message', message)
    })
})

