<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0">Pengguna</h5>
    <router-link class="btn btn-primary" to="/users/new">Tambah Pengguna</router-link>
  </div>

  <LoadingSpinner v-if="loading" />

  <div v-else class="card shadow-sm">
    <div class="table-responsive">
      <table class="table mb-0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.username }}</td>
            <td>{{ u.email }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link class="btn btn-outline-secondary" :to="`/users/${u.id}`">Edit</router-link>
                <button class="btn btn-outline-danger" @click="onDelete(u.id)">Hapus</button>
              </div>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="3" class="text-center text-muted py-3">Belum ada data.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UserAPI } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const users = ref([]);
const loading = ref(true);

async function fetchData() {
  loading.value = true;
  try {
    const resp = await UserAPI.list();
    users.value = Array.isArray(resp.data) ? resp.data : (resp.data?.results ?? []);
  } catch (e) {
    console.error("Error fetching users:", e);
  } finally {
    loading.value = false;
  }
}

async function onDelete(id) {
  if (!confirm("Hapus pengguna ini?")) return;
  await UserAPI.remove(id);
  await fetchData();
}

onMounted(fetchData);
</script>
