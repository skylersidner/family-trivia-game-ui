import axios from "../utils/axios";
import { IUser } from "../models/users";

const basePath = "/api/accounts";

const updateAccount = (user: IUser, data: any): Promise<any> => {
  const { fullName, email, password } = data;
  return axios.patch(`${basePath}/${user._id}`, {
    fullName,
    email,
    password,
  });
};

const accountsService = {
  updateAccount,
};
export default accountsService;
