import { apiClient, API_ENDPOINTS } from "./config";
import type { LoginCredentials, UserProfile } from "../model";

export const authAPI = {
  loginUser: async (credentials: LoginCredentials) => {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get(
      API_ENDPOINTS.AUTH.PROFILE
    );

    return response.data;
  },
};