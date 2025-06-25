import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/employer';

export default class EmployerProfileService {
  constructor(token) {
    this.token = token;
  }

  async getEmployerProfile() {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch educations:', error);
      throw error;
    }
  }

  async saveEmployerProfile(profileData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/profile/save`, profileData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch educations:', error);
      throw error;
    }
  }
}
