import createApiClient from "./config/api.service";

class UploadFileService {
  constructor(baseURL = "/api/documents") {
    this.apiClient = createApiClient(baseURL);
  }

  async uploadFile(data) {
    try {
      const endpoint = "";
      const fullURL = `${this.baseURL}${endpoint}`;
      console.log(`Full API URL: ${fullURL}`);
      
      const response = (await this.apiClient.post("", data));
      return response;
    } catch (error) {
      console.error("Error details:", error.config.url); 
      console.error("Error upload file service:", error);
      throw error; 
    }
  }
  
}

export default new UploadFileService();
