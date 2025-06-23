import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/applications';

export default class ApplicationService {
  constructor(token) {
    this.token = token;
  }

  async getApplicationsForUser() {
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
  async getApplicationsForEmployer() {
    try {
      const response = await axios.get(`${API_BASE_URL}/employer`, {
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
  async getApplicationsForJob(jobId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/job/${jobId}`, {
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

  async AddApplicationForJob(applicationData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/apply`, applicationData, {
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

  async updateApplicationStatus(applicationData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/status`, applicationData, {
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
