<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="mb-3">{{ isEdit ? "Edit" : "Tambah" }} Artikel</h5>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Judul</label>
          <input
            v-model="form.title"
            class="form-control"
            required
            @input="generateSlug"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Slug</label>
          <input v-model="form.slug" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Kategori</label>
          <select v-model="form.category" class="form-select" required>
            <option :value="null" disabled>Pilih kategori</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Konten</label>
          <textarea
            v-model="form.body"
            class="form-control"
            rows="6"
            placeholder="Isi artikel..."
          ></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Thumbnail URL</label>
          <input v-model="form.thumbnail_url" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Estimasi Pembacaan</label>
          <input
            v-model="form.read_estimation"
            class="form-control"
            type="number"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Tanggal Publikasi</label>
          <input v-model="form.published_at" class="form-control" type="date" />
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-primary" :disabled="saving" type="submit">
            <span
              v-if="saving"
              class="spinner-border spinner-border-sm me-2"
            ></span>
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
          <router-link class="btn btn-outline-secondary" to="/articles"
            >Kembali</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArticleAPI, CategoryAPI } from "@/services/api";
import { useToast } from "vue-toastification";

// Mengimpor fungsi dari utils/slugUtils.js
import { generateSlug, isValidSlug } from "@/utils/slugUtils";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const categories = ref([]);
const saving = ref(false);
const isEdit = computed(() => !!route.params.id);

// Form data untuk artikel
const form = reactive({
  title: "",
  body: "",
  category: null,
  slug: "",
  thumbnail_url: "",
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
      form.thumbnail_url = data.thumbnail_url || "";
      form.read_estimation = data.read_estimation || null;
      form.published_at = data.published_at || "";

      toast.info("Data artikel berhasil dimuat", {
        timeout: 2000,
        icon: "📝",
      });
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    toast.error("Gagal memuat data artikel", {
      timeout: 3000,
      icon: "❌",
    });
  }
});

// Fungsi untuk menghasilkan slug otomatis berdasarkan judul artikel
function generateSlugFromTitle() {
  form.slug = generateSlug(form.title);
}

async function onSubmit() {
  saving.value = true;

  if (!form.slug || !form.category) {
    toast.warning("Slug dan Kategori harus diisi!", {
      timeout: 3000,
      icon: "⚠️",
    });
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

      toast.success("Artikel berhasil diperbarui!", {
        timeout: 3000,
        icon: "✅",
      });
    } else {
      await ArticleAPI.create(formData);

      toast.success("Artikel berhasil ditambahkan!", {
        timeout: 3000,
        icon: "➕",
      });
    }

    // Tunggu sebentar sebelum redirect agar toast terlihat
    setTimeout(() => {
      router.push("/articles");
    }, 1000);
  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim data:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      "Terjadi kesalahan saat menyimpan artikel";

    toast.error(errorMessage, {
      timeout: 4000,
      icon: "❌",
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
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-control,
.form-select {
  border-radius: 8px;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }

  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .d-flex.gap-2 {
    flex-direction: column;
    gap: 0.5rem !important;
  }

  .btn {
    width: 100%;
  }
}
</style>
