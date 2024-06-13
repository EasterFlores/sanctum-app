<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section id="sidebar">
    <div class="sidebar-con">
      <div class="sidebar-header">
        <p>HMS</p>
      </div>
      <div class="sidebar-nav-con">
        <ul class="sidebar-nav">
          <div class="sidebar-details">
            <p>
              {{
                account_type == 1
                  ? "Admin"
                  : account_type == 2
                  ? "Doctor"
                  : "Patient"
              }}
            </p>
          </div>
          <router-link to="/dashboard">
            <i class="fa-solid fa-tv"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link
            to="/admin/viewAppointments"
            v-if="isAuthenticate && account_type == 1"
          >
            <i class="fa-solid fa-calendar-check"></i>
            <span>Appointments</span>
          </router-link>
          <router-link
            to="/admin/manageDoctors"
            v-if="isAuthenticate && account_type == 1"
          >
            <i class="fa-solid fa-user-doctor"></i>
            <span>Manage Doctors</span>
          </router-link>
          <router-link
            to="/admin/managePatients"
            v-if="isAuthenticate && account_type == 1"
          >
            <i class="fa-solid fa-hospital-user"></i>
            <span>Manage Patients</span>
          </router-link>
          <router-link
            to="/admin/medicalRecords"
            v-if="isAuthenticate && account_type == 1"
          >
            <i class="fa-solid fa-file-medical"></i>
            <span>Medical Records</span>
          </router-link>
          <router-link
            to="/doctor/medicalRecord"
            v-if="isAuthenticate && account_type == 2"
          >
            <i class="fa-solid fa-book"></i>
            <span>Medical Record</span>
          </router-link>
          <router-link
            to="/doctor/manageAppointments"
            v-if="isAuthenticate && account_type == 2"
          >
            <i class="fa-solid fa-calendar-check"></i>
            <span>Appointments</span>
          </router-link>
          <router-link
            to="/doctor/managePatientRecord"
            v-if="isAuthenticate && account_type == 2"
          >
            <i class="fa-solid fa-hospital-user"></i>
            <span>Patients Record</span>
          </router-link>
          <router-link
            to="/doctor/manageAccount"
            v-if="isAuthenticate && account_type == 2"
          >
            <i class="fa-solid fa-address-card"></i>
            <span>My Account</span>
          </router-link>
          <router-link
            to="/patient/appointment"
            v-if="isAuthenticate && account_type == 3"
          >
            <i class="fa-solid fa-calendar-check"></i>
            <span>Appointments</span>
          </router-link>
          <router-link
            to="/patient/medicalRecords"
            v-if="isAuthenticate && account_type == 3"
          >
            <i class="fa-solid fa-calendar-check"></i>
            <span>Medical Records</span>
          </router-link>
          <router-link
            to="/patient/viewRecord"
            v-if="isAuthenticate && account_type == 3"
          >
            <i class="fa-solid fa-circle-user"></i>
            <span>Patient Record</span>
          </router-link>
          <router-link to="/logout" v-if="isAuthenticate">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </router-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      account_type: 0,
      isAuthenticate: false,
    };
  },
  mounted() {
    this.account_type = localStorage.getItem("account_type");
    this.isAuthenticate = !!localStorage.getItem("token");
  },
};
</script>

<style scoped>
#sidebar {
  position: fixed;
  left: 0;
  height: 100%;
  width: 80px;
  z-index: 9;
  transition: 0.3s;
  background: var(--global-color-primary);
  box-shadow: var(--global-shadow);
}

#sidebar:hover {
  width: 250px;
}

#sidebar:hover .sidebar-nav a span {
  opacity: 1;
  visibility: visible;
}

#sidebar:hover .sidebar-header {
  opacity: 1;
}

#sidebar .sidebar-header {
  opacity: 0;
  transition: 0.3s;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 10px;
}

#sidebar .sidebar-header p {
  color: var(--global-color-white);
  font-weight: 600;
}

#sidebar .sidebar-nav {
  padding: 0;
  margin: 0;
}

#sidebar .sidebar-nav a {
  padding: 15px 10px 15px 35px;
  display: flex;
  align-items: center;
  gap: 20px;
}

#sidebar:hover .sidebar-details {
  opacity: 1;
  visibility: visible;
}

#sidebar .sidebar-details {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s, visibility 0.3s;
  opacity: 0;
  background: #0061ff;
  visibility: hidden;
}

#sidebar .sidebar-details p {
  font-weight: 600;
  color: var(--global-color-white);
}

#sidebar .sidebar-nav a:hover {
  background: var(--global-color-white);
}

#sidebar .sidebar-nav a:hover span,
#sidebar .sidebar-nav a:hover i {
  color: var(--global-color-primary);
}

#sidebar .sidebar-nav a span {
  opacity: 0;
  visibility: hidden;
  color: var(--global-color-white);
  font-weight: 600;
  transition: opacity 0.3s, visibility 0.3s;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
}

#sidebar .sidebar-nav a i {
  color: var(--global-color-white);
  font-size: 15px;
}
</style>