<template>
  <div class="dashboard-container">
    <div class="welcome-section mb-4">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h2 class="welcome-title mb-2">
            <i class="fas fa-sun me-2 text-warning"></i>
            Good Morning, Admin!
          </h2>
          <p class="welcome-subtitle text-muted mb-0">
            Welcome back to Mini Blog Admin. Here's what's happening with your blog today.
          </p>
        </div>
        <div class="col-lg-4 text-lg-end">
          <div class="current-time">
            <small class="text-muted">{{ currentDate }}</small>
            <div class="time-display fw-bold">{{ currentTime }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-4 mb-4">
      <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="stats-card card border-0 h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="stats-icon bg-primary">
                <i class="fas fa-newspaper"></i>
              </div>
              <div class="ms-3 flex-grow-1">
                <div class="stats-number">{{ stats.articles }}</div>
                <div class="stats-label">Total Articles</div>
                <div class="stats-change text-success">
                  <i class="fas fa-arrow-up"></i> +12% from last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="stats-card card border-0 h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="stats-icon bg-success">
                <i class="fas fa-tags"></i>
              </div>
              <div class="ms-3 flex-grow-1">
                <div class="stats-number">{{ stats.categories }}</div>
                <div class="stats-label">Categories</div>
                <div class="stats-change text-info">
                  <i class="fas fa-arrow-right"></i> No change
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="stats-card card border-0 h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="stats-icon bg-warning">
                <i class="fas fa-users"></i>
              </div>
              <div class="ms-3 flex-grow-1">
                <div class="stats-number">{{ stats.users }}</div>
                <div class="stats-label">Active Users</div>
                <div class="stats-change text-success">
                  <i class="fas fa-arrow-up"></i> +5% this week
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6">
        <div class="stats-card card border-0 h-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="stats-icon bg-info">
                <i class="fas fa-eye"></i>
              </div>
              <div class="ms-3 flex-grow-1">
                <div class="stats-number">{{ stats.views }}</div>
                <div class="stats-label">Page Views</div>
                <div class="stats-change text-success">
                  <i class="fas fa-arrow-up"></i> +18% today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="activity-card card border-0 h-100">
          <div class="card-header bg-transparent border-0 pb-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="card-title mb-0">
                <i class="fas fa-clock me-2 text-primary"></i>
                Recent Activities
              </h5>
              <button class="btn btn-outline-primary btn-sm">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="activity-list">
              <div class="activity-item" v-for="activity in activities" :key="activity.id">
                <div class="activity-icon" :class="activity.iconClass">
                  <i :class="activity.icon"></i>
                </div>
                <div class="activity-content">
                  <div class="activity-title">{{ activity.title }}</div>
                  <div class="activity-description">{{ activity.description }}</div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="quick-actions-card card border-0 mb-4">
          <div class="card-header bg-transparent border-0 pb-0">
            <h5 class="card-title mb-0">
              <i class="fas fa-bolt me-2 text-warning"></i>
              Quick Actions
            </h5>
          </div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col-6">
                <button class="btn btn-outline-primary w-100 quick-action-btn" @click="navigateToPage('/articles')">
                  <i class="fas fa-plus mb-2"></i>
                  <div>New Article</div>
                </button>
              </div>
              <div class="col-6">
                <button class="btn btn-outline-success w-100 quick-action-btn" @click="navigateToPage('/categories')">
                  <i class="fas fa-tags mb-2"></i>
                  <div>Categories</div>
                </button>
              </div>
              <div class="col-6">
                <button class="btn btn-outline-info w-100 quick-action-btn" @click="navigateToPage('/users')">
                  <i class="fas fa-users mb-2"></i>
                  <div>Manage Users</div>
                </button>
              </div>
              <div class="col-6">
                <button class="btn btn-outline-secondary w-100 quick-action-btn">
                  <i class="fas fa-cog mb-2"></i>
                  <div>Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="system-status-card card border-0">
          <div class="card-header bg-transparent border-0 pb-0">
            <h5 class="card-title mb-0">
              <i class="fas fa-server me-2 text-success"></i>
              System Status
            </h5>
          </div>
          <div class="card-body">
            <div class="status-item" v-for="status in systemStatus" :key="status.name">
              <div class="d-flex justify-content-between align-items-center">
                <div class="status-info">
                  <div class="status-name">{{ status.name }}</div>
                  <div class="status-description">{{ status.description }}</div>
                </div>
                <div class="status-indicator" :class="status.status">
                  <div class="status-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4 mt-2">
      <div class="col-12">
        <div class="chart-card card border-0">
          <div class="card-header bg-transparent border-0">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="card-title mb-0">
                <i class="fas fa-chart-line me-2 text-info"></i>
                Analytics Overview
              </h5>
              <div class="btn-group" role="group">
                <input type="radio" class="btn-check" name="chartPeriod" id="week" checked>
                <label class="btn btn-outline-secondary btn-sm" for="week">7 Days</label>
                
                <input type="radio" class="btn-check" name="chartPeriod" id="month">
                <label class="btn btn-outline-secondary btn-sm" for="month">30 Days</label>
                
                <input type="radio" class="btn-check" name="chartPeriod" id="year">
                <label class="btn btn-outline-secondary btn-sm" for="year">1 Year</label>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <div class="chart-mock">
                <div class="chart-bars">
                  <div class="bar" style="height: 60%"></div>
                  <div class="bar" style="height: 80%"></div>
                  <div class="bar" style="height: 45%"></div>
                  <div class="bar" style="height: 90%"></div>
                  <div class="bar" style="height: 70%"></div>
                  <div class="bar" style="height: 85%"></div>
                  <div class="bar" style="height: 65%"></div>
                </div>
                <div class="chart-info text-center mt-3">
                  <h4 class="text-primary">+24.5%</h4>
                  <p class="text-muted mb-0">Increase in page views this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentTime = ref('')
const currentDate = ref('')

const stats = ref({
  articles: '124',
  categories: '8',
  users: '1,250',
  views: '45,678'
})

const activities = ref([
  {
    id: 1,
    title: 'New article published',
    description: '"Understanding Vue 3 Composition API" has been published',
    time: '2 minutes ago',
    icon: 'fas fa-newspaper',
    iconClass: 'activity-icon-success'
  },
  {
    id: 2,
    title: 'User registered',
    description: 'New user "john.doe@email.com" joined the platform',
    time: '15 minutes ago',
    icon: 'fas fa-user-plus',
    iconClass: 'activity-icon-info'
  },
  {
    id: 3,
    title: 'Category updated',
    description: 'Technology category settings have been modified',
    time: '1 hour ago',
    icon: 'fas fa-tags',
    iconClass: 'activity-icon-warning'
  },
  {
    id: 4,
    title: 'System backup completed',
    description: 'Daily backup process finished successfully',
    time: '3 hours ago',
    icon: 'fas fa-database',
    iconClass: 'activity-icon-success'
  },
  {
    id: 5,
    title: 'Comment moderation',
    description: '5 comments are pending for review',
    time: '5 hours ago',
    icon: 'fas fa-comments',
    iconClass: 'activity-icon-primary'
  }
])

const systemStatus = ref([
  {
    name: 'Database',
    description: 'MySQL 8.0',
    status: 'online'
  },
  {
    name: 'Web Server',
    description: 'Nginx 1.20',
    status: 'online'
  },
  {
    name: 'Cache',
    description: 'Redis 6.2',
    status: 'online'
  },
  {
    name: 'Storage',
    description: '85% used',
    status: 'warning'
  }
])

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  })
  currentDate.value = now.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function navigateToPage(path) {
  router.push(path)
}

let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Dashboard Container */
.dashboard-container {
  font-family: 'Inter', sans-serif;
  animation: fadeInUp 0.6s ease-out;
}

/* Welcome Section */
.welcome-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.05), transparent);
  animation: shimmer 3s ease-in-out infinite;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.welcome-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
}

.current-time {
  text-align: center;
  padding: 1rem;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.time-display {
  font-size: 1.5rem;
  color: #6366f1;
  font-weight: 600;
  letter-spacing: 0.1em;
}

/* Statistics Cards */
.stats-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.stats-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.bg-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6) !important; }
.bg-success { background: linear-gradient(135deg, #10b981, #059669) !important; }
.bg-warning { background: linear-gradient(135deg, #f59e0b, #d97706) !important; }
.bg-info { background: linear-gradient(135deg, #06b6d4, #0891b2) !important; }

.stats-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stats-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stats-change {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Activity Card */
.activity-card,
.quick-actions-card,
.system-status-card,
.chart-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border-radius: 16px !important;
}

.activity-list {
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(99, 102, 241, 0.05);
  border-color: rgba(99, 102, 241, 0.2);
  transform: translateX(5px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 1rem;
  flex-shrink: 0;
}

.activity-icon-success { background: linear-gradient(135deg, #10b981, #059669); }
.activity-icon-info { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.activity-icon-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
.activity-icon-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); }

.activity-title {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.activity-description {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.activity-time {
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Quick Actions */
.quick-action-btn {
  height: 80px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px !important;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.quick-action-btn i {
  font-size: 1.2rem;
}

/* System Status */
.status-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.status-item:last-child {
  border-bottom: none;
}

.status-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
}

.status-description {
  color: #64748b;
  font-size: 0.8rem;
}

.status-indicator {
  position: relative;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-indicator.online .status-dot {
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
}

.status-indicator.warning .status-dot {
  background: #f59e0b;
  box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
}

.status-indicator.offline .status-dot {
  background: #ef4444;
  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
}

/* Chart Section */
.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.5);
  border-radius: 12px;
  border: 2px dashed rgba(99, 102, 241, 0.3);
}

.chart-mock {
  text-align: center;
  width: 100%;
}

.chart-bars {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 1rem;
  height: 150px;
  margin-bottom: 2rem;
}

.bar {
  width: 30px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 4px 4px 0 0;
  animation: barGrow 2s ease-out;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 currentColor;
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

@keyframes barGrow {
  from {
    height: 0;
  }
  to {
    height: inherit;
  }
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .welcome-title {
    font-size: 1.5rem;
  }
  
  .stats-number {
    font-size: 1.5rem;
  }
  
  .current-time {
    margin-top: 1rem;
  }
  
  .time-display {
    font-size: 1.2rem;
  }
}

@media (max-width: 575.98px) {
  .welcome-section {
    padding: 1.5rem;
  }
  
  .welcome-title {
    font-size: 1.3rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
  
  .stats-number {
    font-size: 1.3rem;
  }
  
  .quick-action-btn {
    height: 70px !important;
    font-size: 0.7rem;
  }
  
  .quick-action-btn i {
    font-size: 1rem;
  }
  
  .chart-bars {
    gap: 0.5rem;
  }
  
  .bar {
    width: 20px;
  }
}

/* Scrollbar Styling */
.activity-list::-webkit-scrollbar {
  width: 4px;
}

.activity-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}

.activity-list::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 2px;
}

/* Enhanced Card Headers */
.card-title {
  font-weight: 700 !important;
  color: #1e293b !important;
  display: flex;
  align-items: center;
}

.card-title i {
  opacity: 0.8;
}

/* Button Group Enhancement */
.btn-group .btn-outline-secondary {
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
}

.btn-check:checked + .btn-outline-secondary {
  background: #6366f1 !important;
  border-color: #6366f1 !important;
  color: white !important;
}
</style>