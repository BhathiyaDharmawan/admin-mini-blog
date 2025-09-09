<template>
  <div class="login-wrapper">
    <!-- Background Elements -->
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div class="row w-100 justify-content-center">
        <div class="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">
          
          <!-- Login Card -->
          <div class="card login-card shadow-lg border-0">
            
            <!-- Card Header -->
            <div class="card-header bg-gradient-primary text-white text-center border-0 py-4">
              <div class="login-logo mb-3">
                <div class="logo-circle mx-auto d-flex align-items-center justify-content-center">
                  <i class="fas fa-shield-alt fa-2x"></i>
                </div>
              </div>
              <h4 class="mb-1 fw-bold">Admin Panel</h4>
              <small class="text-white-50">Masuk ke dashboard admin</small>
            </div>

            <!-- Card Body -->
            <div class="card-body p-4">
              <form @submit.prevent="onSubmit">
                
                <!-- Username Field -->
                <div class="mb-3">
                  <label class="form-label fw-semibold text-secondary">
                    <i class="fas fa-user me-2 text-primary"></i>Username
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="fas fa-user text-muted"></i>
                    </span>
                    <input 
                      v-model="form.username" 
                      type="text"
                      class="form-control form-control-lg border-start-0 ps-0" 
                      placeholder="Masukkan username"
                      required 
                    />
                  </div>
                </div>

                <!-- Password Field -->
                <div class="mb-4">
                  <label class="form-label fw-semibold text-secondary">
                    <i class="fas fa-lock me-2 text-primary"></i>Password
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0">
                      <i class="fas fa-lock text-muted"></i>
                    </span>
                    <input 
                      v-model="form.password" 
                      type="password" 
                      class="form-control form-control-lg border-start-0 ps-0" 
                      placeholder="Masukkan password"
                      required 
                    />
                  </div>
                </div>

                <!-- Login Button -->
                <div class="d-grid mb-3">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg fw-bold position-relative"
                    :class="{ 'btn-loading': loading }"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    <span>{{ loading ? 'Memproses...' : 'Masuk' }}</span>
                  </button>
                </div>

              </form>
            </div>

            <!-- Card Footer -->
            <div class="card-footer bg-light text-center border-0 py-3">
              <small class="text-muted">
                <i class="fas fa-info-circle me-1"></i>
                Hubungi administrator jika mengalami kesulitan
              </small>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { login } from '../services/api'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()
const form = reactive({ username: '', password: '' })
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  
  try {
    const data = await login({ username: form.username, password: form.password })
    const token = data?.access
    
    if (!token) {
      toast.error('Token tidak ditemukan dalam respons server')
      return
    }
    
    localStorage.setItem('mb_token', token)
    
    // Toast sukses
    toast.success('Login berhasil! Mengarahkan ke dashboard...', {
      timeout: 2000,
      icon: '✓'
    })
    
    // Tunggu sebentar sebelum redirect agar toast terlihat
    setTimeout(() => {
      router.push({ name: 'dashboard' })
    }, 1500)
    
  } catch (error) {
    console.error('Login error:', error)
    
    // Handle error dengan toast
    const errorMessage = error?.response?.data?.detail || 'Login gagal. Periksa username dan password Anda.'
    
    toast.error(errorMessage, {
      timeout: 4000,
      icon: '⚠️'
    })
    
    // Clear password field on error
    form.password = ''
    
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Custom Bootstrap Overrides & Enhancements */
body {
  font-family: 'Inter', sans-serif !important;
}

/* Login Wrapper */
.login-wrapper {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  overflow: hidden;
}

/* Animated Background Shapes */
.bg-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 15%;
  left: 10%;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 70%;
  right: 15%;
  animation: float 6s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 60%;
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  33% { transform: translateY(-20px) rotate(5deg) scale(1.05); }
  66% { transform: translateY(-10px) rotate(-3deg) scale(0.95); }
}

/* Container positioning */
.container-fluid {
  position: relative;
  z-index: 2;
}

/* Enhanced Card Styling */
.login-card {
  border-radius: 20px !important;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  animation: slideUp 0.8s ease-out;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

/* Custom Bootstrap Gradient */
.bg-gradient-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
}

.card-header {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  position: relative;
}

.card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Logo Circle */
.logo-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
}

/* Enhanced Form Controls */
.form-control-lg {
  border-radius: 12px !important;
  font-size: 1rem !important;
  padding: 12px 16px !important;
  transition: all 0.3s ease !important;
  background: #f8f9fa !important;
}

.form-control:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
  background: white !important;
}

.input-group-text {
  border-radius: 12px 0 0 12px !important;
  background: #f8f9fa !important;
  border-color: #dee2e6 !important;
}

.form-control.border-start-0 {
  border-left: none !important;
  border-radius: 0 12px 12px 0 !important;
}

/* Enhanced Button */
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  border: none !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  transition: all 0.3s ease !important;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4) !important;
  background: linear-gradient(135deg, #5855f7, #7c3aed) !important;
}

.btn-primary:active {
  transform: translateY(0) !important;
}

.btn-loading {
  position: relative;
}

/* Form Labels */
.form-label {
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.text-primary {
  color: #6366f1 !important;
}

/* Footer Styling */
.card-footer {
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  background: rgba(248, 249, 250, 0.8) !important;
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Enhancements */
@media (max-width: 576px) {
  .login-card {
    margin: 0 10px;
  }
  
  .card-header {
    padding: 1.5rem 1rem !important;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .logo-circle {
    width: 60px;
    height: 60px;
  }
  
  .fa-2x {
    font-size: 1.5em !important;
  }
}

/* Loading State Enhancements */
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Focus States */
.form-control:focus,
.btn:focus {
  outline: none !important;
}

/* Text Utilities Enhancement */
.text-white-50 {
  color: rgba(255, 255, 255, 0.7) !important;
}

.fw-semibold {
  font-weight: 600 !important;
}

/* Custom Scrollbar untuk Mobile */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 2px;
}
</style>