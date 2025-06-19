import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth';

export default class AuthService {
  async registerUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Failed to register user:', userData, error);
      throw error;
    }
  }

  async loginUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      console.error('Failed to login user:', userData, error);
      throw error;
    }
  }
}
