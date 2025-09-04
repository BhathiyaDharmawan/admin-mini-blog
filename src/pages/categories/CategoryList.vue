<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0">Kategori</h5>
    <router-link class="btn btn-primary" to="/categories/new">Tambah</router-link>
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
            <td class="text-muted">{{ item.description }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link class="btn btn-outline-secondary" :to="`/categories/${item.id}`">Edit</router-link>
                <button class="btn btn-outline-danger" @click="onDelete(item.id)">Hapus</button>
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

const items = ref([])
const loading = ref(true)

async function fetchData() {
  loading.value = true
  try {
    const response = await CategoryAPI.list()
    items.value = response.data
  } catch (e) {
    console.error('Error fetching categories:', e)
  } finally {
    loading.value = false
  }
}

async function onDelete(id) {
  if (!confirm('Hapus kategori ini?')) return
  await CategoryAPI.remove(id)
  await fetchData()
}

onMounted(fetchData)
</script>
