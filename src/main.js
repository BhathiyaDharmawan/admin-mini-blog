import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

// Import Vue Toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Konfigurasi options untuk toast
const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
}

// Buat app instance dan gunakan plugin
const app = createApp(App)

app.use(router)
app.use(Toast, toastOptions)
app.mount('#app')