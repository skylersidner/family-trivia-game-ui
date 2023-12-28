import React from "react";

import { authenticationService } from "../utils/auth";

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: (callback: VoidFunction) => void;
  updateUser: (user: any) => void;
}

function useAuth() {
  return React.useContext(AuthContext);
}

const AuthContext = React.createContext<AuthContextType>(null!);
function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = localStorage.getItem("user");
  let [user, setUser] = React.useState<any>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const signIn = (email: string, password: string) => {
    return authenticationService.signIn(email, password).then((user: any) => {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    });
  };

  const signOut = (callback: VoidFunction) => {
    return authenticationService.signOut().then(() => {
      localStorage.removeItem("user");
      setUser(null);
    });
  };
  const updateUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  let value = { user, signIn, signOut, updateUser };
  let test = (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export { useAuth };
