const User = require('./models/users/users.mongo')

let io;
let socket;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            allowEIO3: true
        })
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

        messagesNamespace.on('connection', async socket => {
            console.log('%s connected to messagesNamespace', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            const user = await User.findOne({ uid: socket.handshake.query.userId })
            user.online = true
            const connectedUser = await user.save()

            socket.broadcast.emit('user connected', connectedUser)

            socket.on('typing', async data => {
                messagesNamespace.to(data.recipientUID).emit('typing', user.name)
            })

            socket.on('typingEnd', () => {
                socket.broadcast.emit('typingEnd')
            })

            socket.on('disconnect', async () => {
                console.log('%s disconnected', socket.handshake.query.userId);
                socket.leave(socket.handshake.query.userId)

                const user = await User.findOne({ uid: socket.handshake.query.userId })
                user.online = false
                const disconnectedUser = await user.save()

                socket.broadcast.emit('user disconnected', disconnectedUser)
            })

            socket = socket
        })

        return { messagesNamespace, socket }
    },
    groupsNamespace: () => {
        if (!io) {
            throw new Error('Socket not initialised')
        }

        let groupsNamespace = io.of('/groups')

        groupsNamespace.on('connection', socket => {
            console.log('%s connected to groupsNamespace', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            socket = socket
        })

        return { groupsNamespace, socket }
    }
}