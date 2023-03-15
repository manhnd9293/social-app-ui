import {io} from 'socket.io-client';
import {SocketEvent} from "../utils/Constant";


function createSocket(user) {
  let socket = io(process.env.REACT_APP_SOCKET_SERVER);

  socket.on('connect', () => {
    console.log('Connect to server successfully');
    const accessToken = localStorage.getItem("accessToken");
    socket.emit('auth', accessToken);

    socket.on('auth-success', () => {
      console.log('auth-success');
      socket.emit(SocketEvent.JoinRoom, user);
    })

    socket.on(SocketEvent.NewConversation, (conversation) => {
      socket.emit(SocketEvent.NewConversation, conversation);
    })

  })

  socket.on('error', (err) => {
    console.log(err);
  });

  socket.on('disconnect', (data)=> {
    console.log(data)
    console.log('socket disconnected');
  })

  return socket
}




export {createSocket}

