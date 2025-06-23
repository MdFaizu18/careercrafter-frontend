import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/interviews';

export default class InterviewService {
  constructor(token) {
    this.token = token;
  }

  async scheduleInterview(interviewData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, interviewData, {
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
