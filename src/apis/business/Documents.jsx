import api from "../index";
import SecureLS from "secure-ls";



const ls = new SecureLS();
const token = ls.get("token");

//-------BuisnessContractList-----//

export async function businessGetContractList() {
    const apiUrl = "api/BusinessDashboard/GetContractList";
    const headers = {
      // "Content-Type": "multipart/form-data",
      'Content-Type': 'application/json',
      "Authorization": token,
    };
    return await api.post(apiUrl, {headers});
  }

//-------BusinessSaveContract-----//

export async function businessSaveContract(data) {
  const apiUrl = "api/BusinessDashboard/SaveContract";
  return await api.post(apiUrl, data);
}

//-----BusinessDownloadContract-----//

export async function businessDownloadContract() {
  const apiUrl = "api/User/DownloadSample";
  return await api.get(apiUrl);
}

//-------BusinessEstimatesList-----//

export async function BusinessEstimatesList(data) {
  const apiUrl = "api/BusinessDashboard/GetManuaEstimateList";
  return await api.post(apiUrl, data);
}

//Business UpdateEstimates----//

export async function businessUpdateEstimates(data) {
  const apiUrl = "api/BusinessDashboard/SendEstimate";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  return await api.post(apiUrl, data, { headers });
}

//---Business DeletePdf----//

export async function businessDeletePdf(data) {
  const apiUrl = "/api/BusinessDashboard/DeletePdf";
  return await api.post(apiUrl, data);
}
//---Business businessReportUser----//

export async function businessReportUser(data) {
  const apiUrl = "/api/User/ReportUser";
  return await api.post(apiUrl, data);
}
