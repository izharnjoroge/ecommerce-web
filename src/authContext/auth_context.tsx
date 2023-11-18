import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthenticationContextProps {
  children: ReactNode;
}

interface AuthenticationContextValue {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticationContext = createContext<
  AuthenticationContextValue | undefined
>(undefined);

export default function AuthenticationContextProvider({
  children,
}: AuthenticationContextProps) {
  const [isAuth, setAuth] = useState(false);

  const contextValue: AuthenticationContextValue = {
    isAuth,
    setAuth,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthContext() {
  const authContext = useContext(AuthenticationContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext must be used within an AuthenticationContextProvider"
    );
  }

  return authContext;
}
