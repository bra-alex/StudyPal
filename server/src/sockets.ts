import socketIo, { Namespace } from 'socket.io'
import { IncomingMessage, Server, ServerResponse } from 'http'

import { getUser } from './services/users/users.service'

import {
  GeneralServerToClientEvents,
  GroupServerToClientEvents,
  MessageClientToServerEvents,
  MessageServerToClientEvents,
} from './models/sockets/sockets.interface'

let io: socketIo.Server<{}, GeneralServerToClientEvents>
let socket: socketIo.Socket

const socketConnection = {
  init: (httpServer: Server<typeof IncomingMessage, typeof ServerResponse>) => {
    io = new socketIo.Server<{}, GeneralServerToClientEvents>(httpServer)
    return io
  },

  generalNamespace: () => {
    if (!io) {
      throw new Error('Socket not initialised')
    }

    io.on('connection', async socket => {
      console.log('%s connected to', socket.id, socket.handshake.query.userId)
      // console.log('%s connected', socket.id, socket.handshake.auth.userId);
      // socket.join(socket.handshake.auth.userId)
      socket.join(socket.handshake.query.userId as string)
      socket = socket

      let connectedUser = await getUser({ uid: socket.handshake.query.userId })

      if (connectedUser!.online !== true) {
        connectedUser!.online = true
        connectedUser = await connectedUser!.save()
        socket.broadcast.emit('userConnected', connectedUser)
      }

      socket.on('disconnect', async () => {
        console.log('%s disconnected', socket.handshake.query.userId)
        socket.leave(socket.handshake.query.userId as string)

        let disconnectedUser = await getUser({ uid: socket.handshake.query.userId })

        if (disconnectedUser!.online !== false) {
          disconnectedUser!.online = false
          disconnectedUser = await disconnectedUser!.save()
          socket.broadcast.emit('userDisconnected', disconnectedUser)
        }
      })
    })

    return { socket, io }
  },
  messagesNamespace: () => {
    if (!io) {
      throw new Error('Socket not initialised')
    }

    let messagesNamespace: socketIo.Namespace<
      MessageClientToServerEvents,
      MessageServerToClientEvents
    > = io.of('/messages')

    messagesNamespace.on('connection', async socket => {
      console.log('%s connected to messagesNamespace', socket.id, socket.handshake.query.userId)
      // console.log('%s connected', socket.id, socket.handshake.auth.userId);
      // socket.join(socket.handshake.auth.userId)
      socket.join(socket.handshake.query.userId as string)

      let connectedUser = await getUser({ uid: socket.handshake.query.userId })

      if (connectedUser!.online !== true) {
        connectedUser!.online = true
        connectedUser = await connectedUser!.save()
        socket.broadcast.emit('userConnected', connectedUser)
      }

      socket.on('typing', data => {
        messagesNamespace.to(data.recipientUID).emit('typing', data.sender)
      })

      socket.on('typingEnd', data => {
        messagesNamespace.to(data.recipientUID).emit('typing', data.sender)
      })

      socket.on('disconnect', async () => {
        console.log('%s disconnected', socket.handshake.query.userId)

        let disconnectedUser = await getUser({ uid: socket.handshake.query.userId })

        if (disconnectedUser!.online !== false) {
          disconnectedUser!.online = false
          disconnectedUser = await disconnectedUser!.save()

          socket.broadcast.emit('userDisconnected', disconnectedUser)
        }
        socket.leave(socket.handshake.query.userId as string)
      })

      socket = socket
    })

    return { messagesNamespace, socket }
  },
  groupsNamespace: () => {
    if (!io) {
      throw new Error('Socket not initialised')
    }

    let groupsNamespace: Namespace<{}, GroupServerToClientEvents> = io.of('/groups')

    groupsNamespace.on('connection', async socket => {
      console.log('%s connected to groupsNamespace', socket.id, socket.handshake.query.userId)
      // console.log('%s connected', socket.id, socket.handshake.auth.userId);
      // socket.join(socket.handshake.auth.userId)
      socket.join(socket.handshake.query.userId as string)

      let connectedUser = await getUser({ uid: socket.handshake.query.userId })

      if (connectedUser!.online !== true) {
        connectedUser!.online = true
        connectedUser = await connectedUser!.save()
        socket.broadcast.emit('userConnected', connectedUser)
      }

      // socket.on('join-group', groupId => {
      //     socket.join(groupId)
      // })

      socket.on('disconnect', async () => {
        console.log('%s disconnected', socket.handshake.query.userId)
        socket.leave(socket.handshake.query.userId as string)

        let disconnectedUser = await getUser({ uid: socket.handshake.query.userId })

        if (disconnectedUser!.online !== false) {
          disconnectedUser!.online = false
          disconnectedUser = await disconnectedUser!.save()

          socket.broadcast.emit('userDisconnected', disconnectedUser)
        }

        // groupsNamespace.in(socket.handshake.query.userId).socketsLeave()
      })
      socket = socket
    })

    return { groupsNamespace, socket }
  },
}

function initSocketServer(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
  socketConnection.init(server)
  socketConnection.generalNamespace()
  socketConnection.messagesNamespace()
  socketConnection.groupsNamespace()
}

export { initSocketServer, socketConnection }
