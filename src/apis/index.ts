import axios from "axios";

const api = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});

interface VerifyNicknameResponse {
  success: boolean;
}

export const AuthApi = {
  verifyNickname: async (nickname: string): Promise<VerifyNicknameResponse> => {
    const response = await api.get(
      `/api/auth/verify-nickname?nickname=${nickname}`
    );
    return response.data;
  },
};
