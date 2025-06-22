import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/support';

export default class SupportService {
  constructor(token) {
    this.token = token;
  }

  async getAllSupportTickets() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch ticket details:', error);
      throw error;
    }
  }

  async addSupportTicket(ticketData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, ticketData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to save ticket:', error);
      throw error;
    }
  }
}
