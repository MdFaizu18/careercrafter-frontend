import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/jobseeker/skills';

export default class SkillsService {
  constructor(token) {
    this.token = token;
  }

  async getSkillsForUser() {
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
  async saveSkills(skills) {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, skills, {
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

  async deleteSKill(skillId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${skillId}`, {
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
