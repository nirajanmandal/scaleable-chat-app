"use client";

import { createContext, useCallback, useContext, useEffect } from "react";
import { io } from "socket.io-client";

type SocketProviderProps = {
  children: React.ReactNode;
};

type TSocketContext = {
  sendMessage: (msg: string) => any;
};

const SocketContext = createContext<TSocketContext | null>(null);

export default function SocketProvider({ children }: SocketProviderProps) {
  const sendMessage: TSocketContext["sendMessage"] = useCallback((msg) => {
    console.log("Send Message", msg);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");

    return () => {
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
}

export function useSocketContext() {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("state is undefined");
  }
  return state;
}
