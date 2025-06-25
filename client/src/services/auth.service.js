import axios from "axios";
// const API_URL = "http://127.0.0.1:8080/api/user";

// 讀取環境變數中的 API URL
const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080";
const API_URL = `${BASE_URL}/api/user`;

class AuthService {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
