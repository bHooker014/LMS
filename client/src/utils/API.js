// Flow: frontend Conponent => API => routes/ => controllers => dataBase => controllers => frontend
import axios from "axios";
const mongoURL = "http://localhost:8000";
// *************************************************************************
// *********** INSTRUCTOR SIDE API *****************************************
// *************************************************************************

export default {
  getAllInstructors: async () => {
    return await axios.get("/api/main/getAllInstructors");
  },
  updateInstructor: async (id, body) => {
    return await axios.put("/api/main/updateInstructor/" + id, body);
  },
  getAInstructor: async (id) => {
    return await axios.get("/api/main/getAInstructor/" + id);
  },
  deleteInstructor: async (id) => {
    return await axios.delete("/api/main/deleteInstructor/" + id);
  },
  deleteInstructorEmail: async function (ref, id) {
    if (ref && !id) {
      return await axios.delete(mongoURL + "/api/attachment/delete/" + ref);
    } else if (ref && id) {
      return await axios
        .delete(mongoURL + "/api/attachment/delete/" + ref)
        .then(axios.delete("/api/email/adminDeleteInstructorEmail/" + id));
    } else {
      axios.delete("/api/email/adminDeleteInstructorEmail/" + id);
    }
  },
  getStudents: async () => {
    return await axios.get("/api/main");
  },
  createStudent: async (body) => {
    return await axios.post("/api/main", body);
  },
  deleteStudent: async (id) => {
    return await axios.delete("/api/main/" + id);
  },
  updateStudent: async (id, body) => {
    return await axios.put("/api/main/" + id, body);
  },
  getAStudent: async (id) => {
    return await axios.get("/api/main/getStudent/" + id);
  },
  addReportCard: async (body) => {
    return await axios.post("/api/main/reportCard", body);
  },
  deleteReportCard: async (body) => {
    return await axios.post(`/api/main/deleteReportCard`, body);
  },
  createAgenda: async (body) => {
    return await axios.post("/api/main/createAgenda", body);
  },
  getAgenda: async (id) => {
    return await axios.get("/api/main/getAgenda/" + id);
  },
  sendMessageWithAtt: async function (formData, config, message) {
    return await axios
      .post(mongoURL + "/api/attachment/upload", formData, config)
      .then(async (response) => {
        let attachment = {
          filename: response.data.filename,
          contentType: response.data.contentType,
        };
        let msgObj = { attachment, message };
        await axios.post("api/email/sendEmailAtt", msgObj);
      })
      .catch((err) => {
        throw err;
      });
  },
  sendMessage: function (message) {
    return axios.post("api/email/sendEmail", { message });
  },
  getMessages: async function (userEmail) {
    return await axios.get("api/email/" + userEmail);
  },
  downloadFile: function (file) {
    return axios({
      method: "GET",
      url: mongoURL + "/api/attachment/download/" + file,
      responseType: "blob",
    });
  },
  deleteEmail: async function (ref, id) {
    if (ref && !id) {
      return await axios.delete(mongoURL + "/api/attachment/delete/" + ref);
    } else if (ref && id) {
      return await axios
        .delete(mongoURL + "/api/attachment/delete/" + ref)
        .then(axios.delete("/api/email/deleteInstructorEmail/" + id));
    } else {
      axios.delete("/api/email/deleteInstructorEmail/" + id);
    }
  },
  getAllVideos: async function () {
    return await axios.get("/api/videos");
  },
  uploadVideo: async function (formData, config, videoInfo) {
    return await axios
      .post(mongoURL + "/api/videos/upload", formData, config)
      .then(async (response) => {
        let refInfo = {
          ref: response.data.filename,
          name: response.data.name
        };
        let infoObj = { refInfo, videoInfo };
       const res = await axios.post("api/videos/upload", infoObj);
        return res
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteVideo: async function (ref) {
    return await axios
    .delete(mongoURL + "/api/videos/delete/" + ref)
    .then(axios.delete("api/videos/deleteVideo/" + ref))
    .catch(err => console.error(err.message))
  },
};
