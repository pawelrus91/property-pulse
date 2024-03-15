"use client";
import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type GlobalContextType = {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
};

// Create a context
const GlobalContext = createContext<GlobalContextType | null>(null);

type GlobalProviderProps = {
  children: React.ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
}
