import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/jobs';

export default class JobService {
  constructor(token) {
    this.token = token;
  }

  async getJobById(jobId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${jobId}`, {
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
  async getJobsForEmployer() {
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
  async getAllJobs() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`, {
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

  async updateJobById(jobId, jobData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${jobId}`, jobData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update job:', error);
      throw error;
    }
  }

  async saveJob(jobData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, jobData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save job:', error);
      throw error;
    }
  }

  async deleteJob(jobId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${jobId}`, {
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
