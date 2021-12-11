import { io } from 'socket.io-client';
import url from '../config/url';

const socket = io(url, { reconnection: false, autoConnect: false });
export default socket;
