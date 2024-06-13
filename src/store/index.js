import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    apiUrl: "http://127.0.0.1:8000/api",
    doctors: [],
    doctor: [],
    account: [],
    appointments: [],
    appointment: [],
    record: [],
    records: [],
    patients: [],
    patient: [],
  },
  getters: {
    getDoctors(state) {
      return state.doctors;
    },
    getPatients(state) {
      return state.patients;
    },
    getAppointments(state) {
      return state.appointments;
    },
    getMedicalRecords(state) {
      return state.records;
    },
    getAccount: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/getAccount/" + id)
        .then((response) => {
          state.account = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getAppointment: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/showAppointment/" + id)
        .then((response) => {
          state.appointment = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getMedicalRecord: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/showMedicalRecords/" + id)
        .then((response) => {
          state.record = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getDoctor: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/showDoctor/" + id)
        .then((response) => {
          state.doctor = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    getPatient: (state) => (id) => {
      return axios
        .get(state.apiUrl + "/showPatient/" + id)
        .then((response) => {
          console.log(response.data);
          state.patient = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setDoctors(state, doctors) {
      state.doctors = doctors;
    },
    setPatients(state, patients) {
      state.patients = patients;
    },
    setMedicalRecords(state, records) {
      state.records = records;
    },
    setAppointments(state, appointments) {
      state.appointments = appointments;
    },
    updateDoctorType(state, doctorType) {
      state.doctor.type = doctorType;
    },
    updateDoctorFullName(state, doctorFullName) {
      state.doctor.fullname = doctorFullName;
    },
    updateDoctorAddress(state, doctorAddress) {
      state.doctor.address = doctorAddress;
    },
    updateDoctorContact(state, doctorContact) {
      state.doctor.contact = doctorContact;
    },
    updateDoctorEmail(state, doctorEmail) {
      state.doctor.email = doctorEmail;
    },
    updatePatientFullName(state, patientFullName) {
      state.patient.fullname = patientFullName;
    },
    updatePatientAddress(state, patientAddress) {
      state.patient.address = patientAddress;
    },
    updatePatientContact(state, patientContact) {
      state.patient.contact = patientContact;
    },
    updatePatientEmail(state, patientEmail) {
      state.patient.email = patientEmail;
    },
    updatePatientBirthday(state, patientBirthday) {
      state.patient.birthday = patientBirthday;
    },
    updatePatientWeight(state, patientWeight) {
      state.patient.weight = patientWeight;
    },
    updatePatientHeight(state, patientHeight) {
      state.patient.height = patientHeight;
    },
    updateWeight(state, patientWeight) {
      state.record.weight = patientWeight;
    },
    updateHeight(state, patientHeight) {
      state.record.height = patientHeight;
    },
  },
  actions: {
    async fetchAccount({ state, commit }, doctorId) {
      try {
        const response = await axios.get(
          state.apiUrl + "/getAccount/" + doctorId
        );
        commit("setAccount", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async getAllMedicalRecords({ state, commit }) {
      try {
        const response = await axios.get(
          state.apiUrl + "/getAllMedicalRecords/"
        );
        commit("setMedicalRecords", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchMedicals({ state, commit }, doctorId) {
      try {
        const response = await axios.get(
          state.apiUrl + "/getAllDoctorMedicals/" + doctorId
        );
        commit("setMedicalRecords", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchAllMedicals({ state, commit }, userId) {
      try {
        const response = await axios.get(
          state.apiUrl + "/viewMedicalRecords/" + userId
        );
        commit("setMedicalRecords", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchDoctors({ state, commit }) {
      try {
        const response = await axios.get(state.apiUrl + "/doctors");
        commit("setDoctors", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchPatients({ state, commit }) {
      try {
        const response = await axios.get(state.apiUrl + "/patients");
        commit("setPatients", response.data);
      } catch (error) {
        alert("Error fetching products: " + error.message);
      }
    },
    async fetchDoctorAppointments({ state, commit }, doctorId) {
      try {
        const response = await axios.get(
          state.apiUrl + "/getDoctorAppointments/" + doctorId
        );
        commit("setAppointments", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchAppointments({ state, commit }, userId) {
      try {
        const response = await axios.get(
          state.apiUrl + "/getAppointments/" + userId
        );
        commit("setAppointments", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    async fetchAllAppointments({ state, commit }) {
      try {
        const response = await axios.get(state.apiUrl + "/getAllAppointments/");
        commit("setAppointments", response.data);
      } catch (error) {
        alert("Error fetching doctors: " + error.message);
      }
    },
    updateDoctorFullName({ commit }, doctorFullName) {
      commit("updateDoctorFullName", doctorFullName);
    },
    updateDoctorAddress({ commit }, doctorAddress) {
      commit("updateDoctorAddress", doctorAddress);
    },
    updateDoctorContact({ commit }, doctorContact) {
      commit("updateDoctorContact", doctorContact);
    },
    updateDoctorEmail({ commit }, doctorEmail) {
      commit("updateDoctorEmail", doctorEmail);
    },
    updatePatientFullName({ commit }, patientFullName) {
      commit("updatePatientFullName", patientFullName);
    },
    updatePatientAddress({ commit }, patientAddress) {
      commit("updatePatientAddress", patientAddress);
    },
    updatePatientContact({ commit }, patientContact) {
      commit("updatePatientContact", patientContact);
    },
    updatePatientEmail({ commit }, patientEmail) {
      commit("updatePatientEmail", patientEmail);
    },
  },
  modules: {},
});
