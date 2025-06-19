import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/jobseeker/resume';

export default class ResumeService {
  constructor(token) {
    this.token = token;
  }

  async getAllResume() {
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
  async getDefaultResume() {
    try {
      const response = await axios.get(`${API_BASE_URL}/default-resume`, {
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

  async uploadResume(resumeData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, resumeData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save job:', error);
      throw error;
    }
  }

  async deleteResume(resumeId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${resumeId}`, {
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
