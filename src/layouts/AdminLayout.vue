<template>
  <div class="admin-wrapper">
    <AppNavbar @logout="onLogout" />
    <div class="d-flex admin-container">
      <AppSidebar />
      <main class="flex-grow-1 main-content">
        <div class="content-area p-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { clearToken } from '@/store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
function onLogout() {
  clearToken()
  router.push({ name: 'login' })
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Admin Wrapper */
.admin-wrapper {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  position: relative;
}

/* Background Pattern */
.admin-wrapper::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

/* Admin Container */
.admin-container {
  min-height: calc(100vh - 70px);
}

/* Main Content */
.main-content {
  background: transparent;
  position: relative;
}

/* Content Area */
.content-area {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px 0 0 0;
  min-height: calc(100vh - 70px);
  box-shadow: 
    -10px 0 30px rgba(0, 0, 0, 0.05),
    0 10px 30px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-bottom: none;
  border-right: none;
  position: relative;
}

/* Enhanced shadows untuk cards di dalam content */
.content-area :deep(.card) {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05) !important;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-area :deep(.card:hover) {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

/* Enhanced table styling */
.content-area :deep(.table) {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.content-area :deep(.table thead th) {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  color: white !important;
  border: none !important;
  font-weight: 600;
  padding: 1rem !important;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.content-area :deep(.table tbody tr) {
  transition: all 0.2s ease;
  border: none !important;
}

.content-area :deep(.table tbody tr:hover) {
  background: rgba(99, 102, 241, 0.05) !important;
  transform: scale(1.01);
}

.content-area :deep(.table tbody td) {
  border-color: rgba(0, 0, 0, 0.05) !important;
  padding: 1rem !important;
  vertical-align: middle;
}

/* Enhanced button styling */
.content-area :deep(.btn) {
  border-radius: 10px !important;
  font-weight: 500 !important;
  padding: 0.5rem 1rem !important;
  transition: all 0.3s ease !important;
  border: none !important;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.content-area :deep(.btn-primary) {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.content-area :deep(.btn-primary:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4) !important;
}

.content-area :deep(.btn-success) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.content-area :deep(.btn-success:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4) !important;
}

.content-area :deep(.btn-warning) {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.content-area :deep(.btn-warning:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4) !important;
}

.content-area :deep(.btn-danger) {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.content-area :deep(.btn-danger:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4) !important;
}

.content-area :deep(.btn-outline-secondary) {
  border: 2px solid #e2e8f0 !important;
  color: #64748b !important;
  background: rgba(255, 255, 255, 0.8);
}

.content-area :deep(.btn-outline-secondary:hover) {
  background: #64748b !important;
  border-color: #64748b !important;
  color: white !important;
  transform: translateY(-2px);
}

/* Enhanced form styling */
.content-area :deep(.form-control) {
  border: 2px solid #e2e8f0 !important;
  border-radius: 10px !important;
  padding: 0.75rem 1rem !important;
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease !important;
}

.content-area :deep(.form-control:focus) {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25) !important;
  background: white !important;
}

.content-area :deep(.form-label) {
  font-weight: 600 !important;
  color: #374151 !important;
  margin-bottom: 0.5rem !important;
}

/* Enhanced alert styling */
.content-area :deep(.alert) {
  border: none !important;
  border-radius: 12px !important;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.content-area :deep(.alert-success) {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%) !important;
  color: #047857 !important;
  border-left: 4px solid #10b981 !important;
}

.content-area :deep(.alert-danger) {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%) !important;
  color: #b91c1c !important;
  border-left: 4px solid #ef4444 !important;
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .content-area {
    border-radius: 0;
    margin: 0;
    min-height: calc(100vh - 70px);
  }
}

@media (max-width: 575.98px) {
  .content-area {
    padding: 1rem !important;
  }
  
  .content-area :deep(.table) {
    font-size: 0.85rem;
  }
  
  .content-area :deep(.btn) {
    padding: 0.4rem 0.8rem !important;
    font-size: 0.8rem !important;
  }
}

/* Scrollbar Enhancement */
.content-area::-webkit-scrollbar {
  width: 6px;
}

.content-area::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.content-area::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 3px;
}

.content-area::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5b5bf6, #7c3aed);
}

/* Loading Animation */
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

/* Enhanced Typography */
.content-area :deep(h1),
.content-area :deep(h2),
.content-area :deep(h3),
.content-area :deep(h4),
.content-area :deep(h5),
.content-area :deep(h6) {
  color: #1e293b !important;
  font-weight: 700 !important;
  letter-spacing: -0.025em;
}

.content-area :deep(.text-muted) {
  color: #64748b !important;
}

/* Badge Enhancement */
.content-area :deep(.badge) {
  border-radius: 8px !important;
  font-weight: 500 !important;
  padding: 0.5em 0.8em !important;
}
</style>