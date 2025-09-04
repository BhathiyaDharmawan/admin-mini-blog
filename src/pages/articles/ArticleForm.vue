<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="mb-3">{{ isEdit ? "Edit" : "Tambah" }} Artikel</h5>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Judul</label>
          <input v-model="form.title" class="form-control" required @input="generateSlug" />
        </div>
        <div class="mb-3">
          <label class="form-label">Slug</label>
          <input v-model="form.slug" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Kategori</label>
          <select v-model="form.category" class="form-select" required>
            <option :value="null" disabled>Pilih kategori</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Konten</label>
          <textarea v-model="form.body" class="form-control" rows="6" placeholder="Isi artikel..."></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Thumbnail URL</label>
          <input v-model="form.thumbnail_url" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Estimasi Pembacaan</label>
          <input v-model="form.read_estimation" class="form-control" type="number" />
        </div>
        <div class="mb-3">
          <label class="form-label">Tanggal Publikasi</label>
          <input v-model="form.published_at" class="form-control" type="date" />
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary" :disabled="saving">Simpan</button>
          <router-link class="btn btn-outline-secondary" to="/articles">Kembali</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArticleAPI, CategoryAPI } from "@/services/api";

const route = useRoute();
const router = useRouter();
const categories = ref([]);
const saving = ref(false);
const isEdit = computed(() => !!route.params.id);

// Form data untuk artikel
const form = reactive({
  title: "",
  body: "",
  category: null, 
  slug: "",
  thumbnail_url: '',
  read_estimation: null,
  published_at: "",
});

onMounted(async () => {
  try {
    // Ambil data kategori dari API
    const response = await CategoryAPI.list();
    categories.value = response.data;

    if (isEdit.value) {
      const data = await ArticleAPI.detail(route.params.id);
      form.title = data.title;
      form.body = data.body;
      form.slug = data.slug;
      form.category = data?.category?.id || null;
      form.thumbnail_url = data.thumbnail_url || '';
      form.read_estimation = data.read_estimation || null;
      form.published_at = data.published_at || '';
    }
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
  }
});

// Fungsi untuk menghasilkan slug otomatis berdasarkan judul artikel
function generateSlug() {
  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}

async function onSubmit() {
  saving.value = true;

  if (!form.slug || !form.category) {
    alert('Slug dan Kategori harus diisi!');
    saving.value = false;
    return;
  }

  const formData = {
    title: form.title.trim(),
    slug: form.slug.trim(),
    body: form.body.trim(),
    blog_category: form.category,  
    thumbnail_url: form.thumbnail_url || null,
    read_estimation: form.read_estimation || 0,
    published_at: form.published_at,
  };

  try {
    if (isEdit.value) {
      await ArticleAPI.update(route.params.id, formData);
    } else {
      await ArticleAPI.create(formData);
    }
    router.push("/articles");
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim data:", error);
  } finally {
    saving.value = false;
  }
}
</script>
