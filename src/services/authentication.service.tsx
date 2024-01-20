import axios from "../utils/axios";

const basePath = "/api/auth";

const signIn = (email: string, password: string): Promise<any> => {
  return axios
    .post(`${basePath}/login`, {
      email,
      password,
    })
    .then((response) => response.data);
};

const signOut = (): Promise<any> => {
  // Return promise for consistency with signIn
  return Promise.resolve();
};

const authenticationService = {
  isAuthenticated: false,
  signIn,
  signOut,
};

export default authenticationService;
