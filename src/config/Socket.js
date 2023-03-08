import {io} from 'socket.io-client';
import {SocketEvent} from "../utils/Constant";


function createSocket(user) {
  let socket = io(process.env.REACT_APP_SOCKET_SERVER);

  const accessToken = localStorage.getItem("accessToken");
  console.log({accessToken});
  socket.emit('auth', accessToken);

  socket.on('auth-success', () => {
    console.log('auth-success');
    socket.emit(SocketEvent.JoinRoom, user);
  })

  socket.on('connect', () => {
    console.log('Connect to server successfully');
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

