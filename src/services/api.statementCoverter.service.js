import createApiClient from './config/api.service';

class StatementConverterService {
  constructor(baseURL = '/api/statements') {
    this.apiClient = createApiClient(baseURL);
  }

  async getAll(params) {
    try {
      const response = await this.apiClient.get('', { params });
      return response;
    } catch (error) {
      console.error('Error fetching all statements:', error);
      throw error; 
    }
  }

  async delete(id) {
    try {
      const response = await this.apiClient.delete(`/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting statement with ID ${id}:`, error);
      throw error; 
    }
  }

  async deleteSelected(data) {
    try {
      const response = await this.apiClient.delete('/deleteSelected', { data });
      return response;
    } catch (error) {
      console.error('Error deleting selected statements:', error);
      throw error; 
    }
  }

  async fetchAll(params) {
    try {
      const response = await this.getAll(params);
      return response;
    } catch (error) {
      console.error('Error fetching statements (fetchAll):', error);
      throw error; 
    }
  }

  async remove(id) {
    try {
      const response = await this.delete(id);
      return response;
    } catch (error) {
      console.error(`Error removing statement with ID ${id} (remove):`, error);
      throw error; 
    }
  }

  async removeSelected(data) {
    try {
      const response = await this.deleteSelected(data);
      return response;
    } catch (error) {
      console.error('Error removing selected statements (removeSelected):', error);
      throw error;
    }
  }

  getRequestParams(page, pageSize, searchObject) {
    let params = {};
    if (page) params['page'] = page;
    if (pageSize) params['pageSize'] = pageSize;
    if (searchObject) {
      if (searchObject.name) params['name'] = searchObject.name;
      if (searchObject.status) params['status'] = searchObject.status;
      if (searchObject.startDate) params['startDate'] = searchObject.startDate;
      if (searchObject.endDate) params['endDate'] = searchObject.endDate;
    }
    return params;
  }
}

export default new StatementConverterService();
