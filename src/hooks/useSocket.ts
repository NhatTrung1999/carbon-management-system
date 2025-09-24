import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (
  url: string,
  onConnect?: (socket: Socket) => void
) => {
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    const socket = io(url, {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`Connected to server: ${socket.id}`);
      onConnect?.(socket);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from server`);
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return socketRef;
};
