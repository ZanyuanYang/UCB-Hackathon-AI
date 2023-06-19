import React, { createContext, useState } from 'react';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});

function AuthProvider({ children }: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
