import React from "react";
import axios from "./axios";

const authenticationService = {
  isAuthenticated: false,
  signIn(email: string, password: string): Promise<any> {
    return axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((response) => response.data);
  },
  signOut(): Promise<any> {
    return axios.get("/api/auth/logout");
  },
};

export { authenticationService };
