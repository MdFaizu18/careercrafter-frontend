import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/jobseeker/experiences';

export default class ExperienceService {
  constructor(token) {
    this.token = token;
  }

  async getExperiencesForUser() {
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

  async addExperience(experienceData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, experienceData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save expreince:', error);
      throw error;
    }
  }

  async deleteExperience(expId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${expId}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to delete job:', error);
      throw error;
    }
  }
}
