let io;
let socket;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer)
        return io
    },
    generalNamespace: () => {
        if (!io) {
            throw new Error('Socket not initialised')
        }

        io.on('connection', socket => {
            console.log('%s connected to', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            socket = socket
        })

        return { socket, io }
    },
    messagesNamespace: () => {
        if (!io) {
            throw new Error('Socket not initialised')
        }

        let messagesNamespace = io.of('/messages')

        messagesNamespace.on('connection', socket => {
            console.log('%s connected to messagesNamespace', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            socket = socket
        })

        return { messagesNamespace, socket }
    },
    groupsNamespace: () => {
        if (!io) {
            throw new Error('Socket not initialised')
        }

        return io.of('/groups')
    }
}