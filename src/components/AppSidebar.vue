<template>
  <div class="sidebar-container">
    <!-- Sidebar Header -->
    <div class="sidebar-header p-3 mb-3">
      <div class="d-flex align-items-center">
        <div class="sidebar-logo me-2">
          <i class="fas fa-tachometer-alt"></i>
        </div>
        <div class="sidebar-title">
          <h6 class="mb-0 fw-bold">Control Panel</h6>
          <small class="text-muted">Management System</small>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav p-3">
      <ul class="nav nav-pills flex-column gap-2">
        <li class="nav-item">
          <router-link class="nav-link sidebar-link" to="/" exact-active-class="active">
            <div class="nav-icon">
              <i class="fas fa-home"></i>
            </div>
            <span class="nav-text">Dashboard</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link sidebar-link" to="/categories" active-class="active">
            <div class="nav-icon">
              <i class="fas fa-tags"></i>
            </div>
            <span class="nav-text">Kategori</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link sidebar-link" to="/articles" active-class="active">
            <div class="nav-icon">
              <i class="fas fa-newspaper"></i>
            </div>
            <span class="nav-text">Artikel</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link class="nav-link sidebar-link" to="/users" active-class="active">
            <div class="nav-icon">
              <i class="fas fa-users"></i>
            </div>
            <span class="nav-text">Users</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer mt-auto p-3">
      <div class="footer-card">
        <div class="d-flex align-items-center">
          <div class="status-indicator me-2"></div>
          <div>
            <small class="text-muted d-block">System Status</small>
            <small class="text-success fw-semibold">All Systems Online</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Sidebar Container */
.sidebar-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sidebar Background Pattern */
.sidebar-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, 
    rgba(99, 102, 241, 0.02) 0%, 
    rgba(139, 92, 246, 0.02) 50%,
    rgba(99, 102, 241, 0.02) 100%);
  z-index: -1;
}

/* Sidebar Header */
.sidebar-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  animation: slideDown 0.6s ease-out;
}

.sidebar-logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.sidebar-logo:hover {
  transform: translateY(-2px) rotate(5deg);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.sidebar-title h6 {
  color: #1e293b;
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.sidebar-title small {
  font-size: 0.75rem;
  color: #64748b;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  animation: slideUp 0.6s ease-out 0.2s both;
}

.nav-pills .nav-link {
  border-radius: 12px !important;
  padding: 0 !important;
  border: none;
  background: transparent;
  color: #64748b;
  margin-bottom: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

.sidebar-link {
  display: flex !important;
  align-items: center;
  padding: 1rem !important;
  text-decoration: none;
  position: relative;
}

.nav-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(100, 116, 139, 0.1);
  margin-right: 1rem;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.nav-text {
  flex: 1;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.nav-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Hover Effects */
.sidebar-link:hover {
  background: rgba(99, 102, 241, 0.08) !important;
  color: #6366f1 !important;
  transform: translateX(5px);
}

.sidebar-link:hover .nav-icon {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
  transform: scale(1.05);
}

.sidebar-link:hover .nav-indicator {
  height: 20px;
}

/* Active State */
.sidebar-link.active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%) !important;
  color: #6366f1 !important;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.sidebar-link.active .nav-icon {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.sidebar-link.active .nav-indicator {
  height: 30px;
  width: 4px;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 0 2px 2px 0;
}

/* Sidebar Footer */
.sidebar-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  animation: slideUp 0.6s ease-out 0.4s both;
}

.footer-card {
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.footer-card:hover {
  background: rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}

.status-indicator {
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  animation: pulse 2s infinite;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.1);
  }
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .sidebar-container {
    position: fixed;
    top: 70px;
    left: -280px;
    height: calc(100vh - 70px);
    z-index: 1040;
    transition: left 0.3s ease;
  }
  
  .sidebar-container.show {
    left: 0;
  }
}

@media (max-width: 575.98px) {
  .sidebar-container {
    width: 260px;
  }
  
  .sidebar-link {
    padding: 0.8rem !important;
  }
  
  .nav-icon {
    width: 35px;
    height: 35px;
    margin-right: 0.8rem;
    font-size: 1rem;
  }
  
  .nav-text {
    font-size: 0.9rem;
  }
}

/* Focus States */
.sidebar-link:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Custom Scrollbar */
.sidebar-container::-webkit-scrollbar {
  width: 4px;
}

.sidebar-container::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-container::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.3);
  border-radius: 2px;
}

.sidebar-container::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.5);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .sidebar-container {
    background: rgba(31, 41, 55, 0.95);
    border-right-color: rgba(255, 255, 255, 0.1);
  }
  
  .sidebar-title h6 {
    color: #f1f5f9;
  }
  
  .sidebar-title small {
    color: #94a3b8;
  }
  
  .nav-pills .nav-link {
    color: #94a3b8;
  }
  
  .sidebar-link:hover {
    background: rgba(99, 102, 241, 0.15) !important;
    color: #a5b4fc !important;
  }
  
  .footer-card {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
  }
}
</style>