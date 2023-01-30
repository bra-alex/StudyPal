const User = require('./models/users/users.mongo')

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

        io.on('connection', async socket => {
            console.log('%s connected to', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            socket = socket

            let connectedUser = await User.findOne({ uid: socket.handshake.query.userId })

            if (connectedUser.online !== true) {
                connectedUser.online = true
                connectedUser = await connectedUser.save()
                socket.broadcast.emit('user connected', connectedUser)
            }

            socket.on('disconnect', async () => {
                console.log('%s disconnected', socket.handshake.query.userId);
                socket.leave(socket.handshake.query.userId)

                let disconnectedUser = await User.findOne({ uid: socket.handshake.query.userId })

                if (disconnectedUser.online !== false) {
                    disconnectedUser.online = false
                    disconnectedUser = await disconnectedUser.save()
                    socket.broadcast.emit('user connected', disconnectedUser)
                }
            })
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

            let connectedUser = await User.findOne({ uid: socket.handshake.query.userId })

            if (connectedUser.online !== true) {
                connectedUser.online = true
                connectedUser = await connectedUser.save()
                socket.broadcast.emit('user connected', connectedUser)
            }

            socket.on('typing', data => {
                messagesNamespace.to(data.recipientUID).emit('typing', data.sender)
            })

            socket.on('typingEnd', () => {
                socket.broadcast.emit('typingEnd')
            })

            socket.on('disconnect', async () => {
                console.log('%s disconnected', socket.handshake.query.userId);
                socket.leave(socket.handshake.query.userId)

                let disconnectedUser = await User.findOne({ uid: socket.handshake.query.userId })

                if (disconnectedUser.online !== false) {
                    disconnectedUser.online = false
                    disconnectedUser = await disconnectedUser.save()

                    socket.broadcast.emit('user connected', disconnectedUser)
                }
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

        groupsNamespace.on('connection', async socket => {
            console.log('%s connected to groupsNamespace', socket.id, socket.handshake.query.userId);
            // console.log('%s connected', socket.id, socket.handshake.auth.userId);
            // socket.join(socket.handshake.auth.userId)
            socket.join(socket.handshake.query.userId)
            socket = socket

            if (connectedUser.online !== true) {
                connectedUser.online = true
                connectedUser = await connectedUser.save()
                socket.broadcast.emit('user connected', connectedUser)
            }

            socket.on('disconnect', async () => {
                console.log('%s disconnected', socket.handshake.query.userId);
                socket.leave(socket.handshake.query.userId)

                let disconnectedUser = await User.findOne({ uid: socket.handshake.query.userId })

                if (disconnectedUser.online !== false) {
                    disconnectedUser.online = false
                    disconnectedUser = await disconnectedUser.save()

                    socket.broadcast.emit('user connected', disconnectedUser)
                }
            })
        })

        return { groupsNamespace, socket }
    }
}