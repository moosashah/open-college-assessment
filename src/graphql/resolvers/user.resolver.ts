import { Credentials } from "../types";
import { login, register } from "../services/user.service";

export const userResolver = {
  Mutation: {
    async register(_: any, { input }: { input: Credentials }) {
      return await register(input);
    },

    async login(_: any, { input }: { input: Credentials }) {
      return await login(input);
    },
  },
};
