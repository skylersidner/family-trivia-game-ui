import React from "react";
import { jwtDecode } from "jwt-decode";
import { authenticationService } from "../utils/auth";

export interface IUser {
  deliveryTimeOptions: any;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  _id: string;
  useSwearWords: boolean;
  fullName: string;
  messageTypes: string[];
  pricingTier: string;
  billingPeriod: string;
}

interface AuthContextType {
  user: IUser | null;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: (callback: VoidFunction) => void;
  updateUser: (user: any) => void;
}

function useAuth() {
  return React.useContext(AuthContext);
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = sessionStorage.getItem("user");
  let [user, setUser] = React.useState<any>(
      storedUser ? JSON.parse(storedUser) : null
  );

  const signIn = async (email: string, password: string) => {
    const { token } = await authenticationService.signIn(email, password);
    const user = jwtDecode(token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    setUser(user);
  };

  const signOut = async () => {
    await authenticationService.signOut();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };
  const updateUser = (user: any) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  let value = { user, signIn, signOut, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export {useAuth};
