import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/jobseeker/profile';

export default class JobseekerProfileService {
  constructor(token) {
    this.token = token;
  }

  async getJobseekerProfile() {
    try {
      const response = await axios.get(`${API_BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      throw error;
    }
  }
  async getProfileCompletion() {
    try {
      const response = await axios.get(`${API_BASE_URL}/completion`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      throw error;
    }
  }
}
