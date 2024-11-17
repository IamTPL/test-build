import createApiClient from "./config/api.service";
class TestAPI {
  constructor(baseURL = "/") {
    this.apiClient = createApiClient(baseURL);
  }

  async getTest() {
    try {
      const response = await this.apiClient.get("");
      console.log("Response from back-end", response.data);
      return response;
    } catch (error) {
      console.error("Error connect back-end", error);
      throw error; 
    }
  }
}

export default new TestAPI();



// import axios from "axios";

// const TestAPI = {
//     getTest: () => {
//         return axios({
//             url: "http://172.16.4.22:8080",
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     }
// }

// export default TestAPI;
