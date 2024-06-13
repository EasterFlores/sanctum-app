import { createRouter, createWebHashHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import DashboardPage from "../components/Dashboard.vue";
import ManageDoctors from "../components/Admin/Doctors.vue";
import ViewAppointment from "../components/Admin/ViewAppointment.vue";
import ManagePatients from "../components/Admin/Patients.vue";
import AppointmentPage from "../components/Patient/Appointment.vue";
import MedicalRecordPage from "../components/Patient/MedicalRecords.vue";
import DoctorManageAppointment from "../components/Doctor/ManageAppointment.vue";
import ViewMedicalRecord from "../components/Admin/ViewMedicalRecord.vue";
import DoctorMedicalRecord from "../components/Doctor/ViewMedicalRecord.vue";
import PatientRecord from "../components/Doctor/PatientRecord.vue";
import ManageAccount from "../components/Doctor/ManageAccount.vue";
import RecordPatient from "../components/Patient/PatientRecord.vue";

const isAuthenticated = () => {
  return localStorage.getItem("token");
};

const isAdmin = () => {
  return localStorage.getItem("account_type") == 1;
};

const isDoctor = () => {
  return localStorage.getItem("account_type") == 2;
};

const isPatient = () => {
  return localStorage.getItem("account_type") == 3;
};

const adminGuard = (to, from, next) => {
  if (isAuthenticated() && isAdmin()) {
    next();
  } else {
    next(from);
  }
};

const doctorGuard = (to, from, next) => {
  if (isAuthenticated() && isDoctor()) {
    next();
  } else {
    next(from);
  }
};

const patientGuard = (to, from, next) => {
  if (isAuthenticated() && isPatient()) {
    next();
  } else {
    next(from);
  }
};

const routes = [
  {
    path: "/",
    name: "index",
    component: LoginPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/admin/manageDoctors",
    name: "admin.manage.doctors",
    component: ManageDoctors,
    beforeEnter: adminGuard,
  },
  {
    path: "/admin/viewAppointments",
    name: "admin.view.appointments",
    component: ViewAppointment,
    beforeEnter: adminGuard,
  },
  {
    path: "/admin/medicalRecords",
    name: "admin.medical.record",
    component: ViewMedicalRecord,
    beforeEnter: adminGuard,
  },
  {
    path: "/doctor/manageAppointments",
    name: "doctor.manage.appointments",
    component: DoctorManageAppointment,
    beforeEnter: doctorGuard,
  },
  {
    path: "/doctor/medicalRecord",
    name: "doctor.medical.record",
    component: DoctorMedicalRecord,
    beforeEnter: doctorGuard,
  },
  {
    path: "/doctor/manageAccount",
    name: "doctor.manage.account",
    component: ManageAccount,
    beforeEnter: doctorGuard,
  },
  {
    path: "/doctor/managePatientRecord",
    name: "doctor.manage.patient.record",
    component: PatientRecord,
    beforeEnter: doctorGuard,
  },
  {
    path: "/admin/managePatients",
    name: "admin.manage.patients",
    component: ManagePatients,
    beforeEnter: adminGuard,
  },
  {
    path: "/patient/appointment",
    name: "patient.appointment",
    component: AppointmentPage,
    beforeEnter: patientGuard,
  },
  {
    path: "/patient/medicalRecords",
    name: "patient.medical.records",
    component: MedicalRecordPage,
    beforeEnter: patientGuard,
  },
  {
    path: "/patient/viewRecord",
    name: "patient.record.patient",
    component: RecordPatient,
    beforeEnter: patientGuard,
  },
  {
    path: "/logout",
    name: "logout",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("account_type");
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
