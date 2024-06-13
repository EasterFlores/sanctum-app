import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import theme from '../src/assets/theme.css'
import 'sweetalert2/dist/sweetalert2.css'
import Swal from 'sweetalert2'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(theme);
app.config.globalProperties.$swal = Swal;
app.mount('#app');
