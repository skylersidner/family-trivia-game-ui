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
        // Return promise for consistency with signIn
        return Promise.resolve();
    },
};

export { authenticationService };
