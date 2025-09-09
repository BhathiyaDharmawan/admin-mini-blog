<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="mb-3">{{ isEdit ? "Edit" : "Tambah" }} Kategori</h5>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input v-model="form.name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Slug</label>
          <input v-model="form.slug" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Deskripsi</label>
          <textarea v-model="form.description" class="form-control" rows="3"></textarea>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary" :disabled="saving" type="submit">
            <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
            {{ saving ? 'Menyimpan...' : 'Simpan' }}
          </button>
          <router-link class="btn btn-outline-secondary" to="/categories">Kembali</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CategoryAPI } from "@/services/api";
import { useToast } from "vue-toastification";
// Mengimpor fungsi dari utils/slugUtils.js
import { formatSlug, isValidSlug } from "@/utils/slugUtils";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const form = reactive({
  name: "",
  slug: "",
  description: "",
});
const saving = ref(false);
const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEdit.value) {
    try {
      const data = await CategoryAPI.detail(route.params.id);
      form.name = data.name;
      form.slug = data.slug; 
      form.description = data.description;
      
      toast.info('Data kategori dimuat', {
        timeout: 2000,
        icon: '📝'
      });
    } catch (error) {
      console.error('Gagal memuat data kategori:', error);
      toast.error('Gagal memuat data kategori', {
        timeout: 3000,
        icon: '❌'
      });
    }
  }
});

// Watcher untuk mengupdate slug setiap kali nama kategori berubah
watch(() => form.name, (newName) => {
  form.slug = formatSlug(newName);
});

async function onSubmit() {
  saving.value = true;
  
  try {
    if (!form.slug || !isValidSlug(form.slug)) {
      toast.warning('Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung. Min. 3 karakter.', {
        timeout: 4000,
        icon: '⚠️'
      });
      saving.value = false;
      return;
    }

    const formData = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim().replace(/\n/g, ' '),
    };

    if (isEdit.value) {
      await CategoryAPI.update(route.params.id, formData);
      
      toast.success('Kategori berhasil diperbarui!', {
        timeout: 3000,
        icon: '✅'
      });
    } else {
      await CategoryAPI.create(formData);
      
      toast.success('Kategori berhasil ditambahkan!', {
        timeout: 3000,
        icon: '➕'
      });
    }

    // Tunggu sebentar sebelum redirect agar toast terlihat
    setTimeout(() => {
      router.push("/categories");
    }, 1000);
    
  } catch (error) {
    console.error('Terjadi kesalahan saat mengirim data:', error);
    
    const errorMessage = error?.response?.data?.message || 
                         error?.response?.data?.detail || 
                         'Terjadi kesalahan saat menyimpan kategori';
    
    toast.error(errorMessage, {
      timeout: 4000,
      icon: '❌'
    });
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
}

.card-body {
  padding: 2rem;
}

.btn {
  border-radius: 8px;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
