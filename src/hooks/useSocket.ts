import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

type SocketHandlers = Record<string, (message: string) => void>;

/**
 * Opens a socket for the lifetime of the component and disconnects on unmount.
 * Handlers are read through a ref, so they always see the latest props/state.
 * The set of event names is fixed when the socket connects.
 */
export const useSocket = (url: string, handlers: SocketHandlers) => {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    const socket = io(url, {
      transports: ['websocket'],
    });

    Object.keys(handlersRef.current).forEach((event) => {
      socket.on(event, (message: string) =>
        handlersRef.current[event]?.(message),
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);
};
