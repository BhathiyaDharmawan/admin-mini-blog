<template>
  <nav class="navbar navbar-expand-lg navbar-modern">
    <div class="container-fluid px-4">
      <!-- Brand Section -->
      <div class="navbar-brand-wrapper d-flex align-items-center">
        <div class="brand-icon me-3">
          <i class="fas fa-blog"></i>
        </div>
        <span class="navbar-brand fw-bold mb-0 brand-text">
          Mini Blog Admin
        </span>
      </div>
      <button class="dropdown-item text-danger" @click="handleLogout" type="button">
        <i class="fas fa-sign-out-alt me-2"></i>Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useToast } from "vue-toastification"
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

// Define emits
const emit = defineEmits(["logout"])

const handleLogout = () => {
  setTimeout(() => {
    // Hapus token dari localStorage
    localStorage.removeItem('mb_token')
    
    // Tampilkan toast sukses logout
    toast.success('Logout berhasil! Sampai jumpa kembali.', {
      timeout: 2000,
      icon: '👋'
    })
    
    // Tunggu sebentar sebelum redirect
    setTimeout(() => {
      // Emit event logout ke parent component
      emit('logout')
      
      // Redirect ke halaman login
      router.push({ name: 'login' })
    }, 1000)
  }, 500)
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

/* Modern Navbar */
.navbar-modern {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 1030;
  transition: all 0.3s ease;
}

/* Brand Section */
.navbar-brand-wrapper {
  animation: slideInLeft 0.6s ease-out;
}

.brand-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.brand-icon:hover {
  transform: translateY(-2px) rotate(5deg);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.brand-text {
  font-size: 1.5rem !important;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

/* Quick Stats */
.quick-stats {
  animation: slideInRight 0.6s ease-out 0.3s both;
}

.stat-item {
  position: relative;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.stat-item:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.stat-item i {
  font-size: 1.1rem;
}

.stat-item .badge {
  position: relative;
  top: -2px;
  font-size: 0.7rem;
  animation: pulse 2s infinite;
}

/* User Profile */
.btn-profile {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(99, 102, 241, 0.2) !important;
  border-radius: 50px !important;
  padding: 0.5rem 1rem !important;
  color: #374151 !important;
  font-weight: 600;
  transition: all 0.3s ease;
  animation: slideInRight 0.6s ease-out 0.4s both;
}

.btn-profile:hover {
  background: #6366f1 !important;
  border-color: #6366f1 !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}

.btn-profile:focus {
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
}

/* User Avatar */
.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.user-avatar-large {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

/* Dropdown Enhancement */
.dropdown-menu {
  border: none !important;
  border-radius: 16px !important;
  padding: 0.5rem !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
  margin-top: 0.5rem !important;
  min-width: 280px;
  animation: dropdownSlide 0.3s ease-out;
}

.dropdown-header {
  padding: 1rem !important;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border-radius: 12px;
  margin-bottom: 0.5rem;
  border: none !important;
}

.dropdown-item {
  border-radius: 8px !important;
  margin: 0.2rem 0 !important;
  padding: 0.7rem 1rem !important;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background: rgba(99, 102, 241, 0.1) !important;
  color: #6366f1 !important;
  transform: translateX(5px);
}

.dropdown-item.text-danger:hover {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #ef4444 !important;
}

.dropdown-item i {
  width: 20px;
  text-align: center;
}

.dropdown-divider {
  margin: 0.5rem 0 !important;
  opacity: 0.1;
}

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .brand-text {
    font-size: 1.3rem !important;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}

@media (max-width: 575.98px) {
  .navbar-modern {
    padding: 0.5rem 1rem !important;
  }

  .brand-text {
    font-size: 1.1rem !important;
  }

  .brand-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    margin-right: 0.5rem !important;
  }

  .btn-profile {
    padding: 0.4rem 0.8rem !important;
  }

  .dropdown-menu {
    min-width: 250px;
  }
}

/* Focus and Accessibility */
.btn-profile:focus,
.dropdown-item:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .navbar-modern {
    background: rgba(31, 41, 55, 0.95) !important;
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .brand-text {
    color: white !important;
  }

  .btn-profile {
    background: rgba(55, 65, 81, 0.8) !important;
    border-color: rgba(99, 102, 241, 0.3) !important;
    color: white !important;
  }

  .dropdown-menu {
    background: rgba(31, 41, 55, 0.95) !important;
    color: white;
  }

  .dropdown-item {
    color: #e5e7eb !important;
  }

  .dropdown-item:hover {
    color: #6366f1 !important;
  }
}
</style>