<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0">Kategori</h5>
    <router-link class="btn btn-primary" to="/categories/new">
      <i class="fas fa-plus me-2"></i>Tambah
    </router-link>
  </div>

  <LoadingSpinner v-if="loading" />

  <div v-else class="card shadow-sm">
    <div class="table-responsive">
      <table class="table mb-0">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Slug</th>
            <th>Deskripsi</th>
            <th style="width: 160px;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.slug }}</td>
            <td class="text-muted">{{ item.description || '-' }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link class="btn btn-outline-primary" :to="`/categories/${item.id}`">
                  <i class="fas fa-edit"></i>
                </router-link>
                <button class="btn btn-outline-danger" @click="confirmDelete(item)" type="button">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CategoryAPI } from '@/services/api'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useToast } from "vue-toastification"

const items = ref([])
const loading = ref(true)
const toast = useToast()

async function fetchData() {
  loading.value = true
  try {
    const response = await CategoryAPI.list()
    items.value = response.data
  } catch (e) {
    console.error('Error fetching categories:', e)
    toast.error('Gagal memuat data kategori', {
      timeout: 3000,
      icon: '❌'
    })
  } finally {
    loading.value = false
  }
}

async function confirmDelete(item) {
  if (confirm(`Hapus kategori "${item.name}"?`)) {
    await onDelete(item.id, item.name)
  }
}

async function onDelete(id, name) {
  try {
    // Tampilkan toast loading
    const loadingToast = toast.info('Menghapus kategori...', {
      timeout: false, // Toast tidak akan hilang otomatis
      icon: '⏳'
    })
    
    await CategoryAPI.remove(id)
    
    // Hapus toast loading dan tampilkan success
    toast.dismiss(loadingToast)
    toast.success(`Kategori "${name}" berhasil dihapus`, {
      timeout: 3000,
      icon: '✅'
    })
    
    await fetchData()
  } catch (error) {
    console.error('Error deleting category:', error)
    
    const errorMessage = error?.response?.data?.message || 
                         error?.response?.data?.detail || 
                         'Gagal menghapus kategori'
    
    toast.error(errorMessage, {
      timeout: 4000,
      icon: '❌'
    })
  }
}

onMounted(fetchData)
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
}

.table {
  margin-bottom: 0;
}

.table th {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-top: none;
  font-weight: 600;
  color: #374151;
  padding: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.table td {
  padding: 1rem;
  vertical-align: middle;
  border-color: #f3f4f6;
}

.table tbody tr:hover {
  background-color: #f9fafb;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.btn-outline-primary {
  border-color: #6366f1;
  color: #6366f1;
}

.btn-outline-primary:hover {
  background-color: #6366f1;
  border-color: #6366f1;
  transform: translateY(-1px);
}

.btn-outline-danger {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-outline-danger:hover {
  background-color: #ef4444;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.btn-group-sm > .btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.text-muted {
  color: #6b7280 !important;
  font-style: italic;
}

/* Responsive design */
@media (max-width: 768px) {
  .table-responsive {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .table th,
  .table td {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
  
  .btn-group-sm > .btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
  
  h5 {
    font-size: 1.25rem;
  }
}
</style>