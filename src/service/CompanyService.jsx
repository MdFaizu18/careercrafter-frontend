import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/company';

export default class CompanyService {
  constructor(token) {
    this.token = token;
  }

  async getCompany() {
    try {
      const response = await axios.get(`${API_BASE_URL}/employer`, {
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
  async saveCompany() {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, {
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
}
