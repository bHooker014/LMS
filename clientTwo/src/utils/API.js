import axios from "axios";
const mongoURL = "http://localhost:8000";
// const secondaryURL = 'http://localhost:4000'
// *************************************************************************
// ***********   STUDENT SIDE API  *****************************************
// *************************************************************************

export default {
  login: function (user) {
    return axios.post("/api/main/login", user);
  },
  getUser: function () {
    return axios.get("/api/main/get-user");
  },
  getInstructors: function () {
    return axios.get("/api/main/instructors");
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
        await axios.post("api/email/student/sendEmailAtt", msgObj);
      })
      .catch((err) => {
        throw err;
      });
  },
  sendMessage: function (message) {
    return axios.post("api/email/student/sendEmail", { message });
  },
  getMessages: async function (userEmail) {
    return await axios.get("api/email/student/" + userEmail);
  },
  downloadFile: function (file) {
    return axios({
      method: "GET",
      url: mongoURL + "/api/attachment/download/" + file,
      responseType: "blob",
    });
  },
  getAgenda: async (id) => {
    return await axios.get("/api/main/getAgenda/" + id);
  },
  deleteEmail: async function (ref, id) {
    if (ref) {
      return await axios
        .delete(mongoURL + "/api/attachment/delete/" + ref)
        .then(axios.delete("/api/email/student/deleteEmail/" + id));
    } else {
      axios.delete("/api/email/student/deleteEmail/" + id);
    }
  },
  createToDoList: async (body) => {
    return await axios.post("/api/main/createToDoList", body);
  },
  getToDoList: async (id) => {
    return await axios.get("/api/main/getToDoList/" + id);
  },
  toDoListItemDone: async (id, body) => {
    return await axios.put("/api/main/toDoListItemDone/" + id, body)
  },
  getAllVideos: async function () {
    return await axios.get("/api/videos");
  },
  downloadVideo: function (file) {
    return axios({
      method: "GET",
      url: mongoURL + "/api/videos/download/" + file,
      responseType: "blob",
    });
  }
};
