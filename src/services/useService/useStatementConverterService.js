// import StatementConverterService from "../api.statementCoverter.service";

// class UseStatementConverterService {
//   async getAll(params) {
//     try {
//       const response = await StatementConverterService.getAll(params);
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async delete(id) {
//     try {
//       const response = await StatementConverterService.delete(id);
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async deleteSeleted(data) {
//     try {
//       const response = await StatementConverterService.deleteSeleted(data);
//       return response;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getRequsetParams(page, pageSize, searchObject) {
//     let params = {};
//     if (page) {
//       params["page"] = page;
//     }

//     if (pageSize) {
//       params["pageSize"] = pageSize;
//     }

//     if (searchObject) {
//       params["name"] = searchObject.name;
//     }

//     if (searchObject) {
//       params["status"] = searchObject.status;
//     }

//     if (searchObject) {
//       params["startDate"] = searchObject.startDate;
//     }

//     if (searchObject) {
//       params["endDate"] = searchObject.endDate;
//     }
//     return params;
//   }


// }

// export default new UseStatementConverterService();