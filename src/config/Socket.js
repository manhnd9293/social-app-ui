import {io} from 'socket.io-client';
import {SocketEvent} from "../utils/Constant";

const socket = io(process.env.REACT_APP_SOCKET_SERVER);

socket.on('connect', () => {
  console.log('Connect to server successfully');
})

socket.on('error', (err) => {
  console.log(err);
});

function createSocketConnection(user) {
  socket.emit(SocketEvent.JoinRoom, user);
}

function disconnectSocket() {
  socket.off('disconnect');
}


export {createSocketConnection, disconnectSocket}

export default socket;