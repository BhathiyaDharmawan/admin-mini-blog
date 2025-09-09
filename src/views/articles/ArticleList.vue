<script setup>
import { ref, onMounted } from "vue";
import { ArticleAPI, CategoryAPI } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useToast } from "vue-toastification";

const articles = ref([]);
const categories = ref([]);
const loading = ref(true);
const toast = useToast();

async function fetchData() {
  loading.value = true;
  try {
    // 1) Ambil kategori
    const catResp = await CategoryAPI.list();
    categories.value = Array.isArray(catResp.data)
      ? catResp.data
      : catResp.data?.results ?? [];
    const categoryMap = new Map(categories.value.map((c) => [c.id, c.name]));

    // 2) Ambil artikel
    const artResp = await ArticleAPI.list();
    const data = Array.isArray(artResp.data)
      ? artResp.data
      : artResp.data?.results ?? [];

    // 3) Mapkan blog_category (UUID) → categoryName
    articles.value = data.map((a) => ({
      ...a,
      categoryName: a.blog_category
        ? categoryMap.get(a.blog_category) ?? "Tidak ada kategori"
        : "Tidak ada kategori",
    }));
  } catch (e) {
    console.error("Error fetching articles:", e);
    toast.error("Gagal memuat data artikel", {
      timeout: 3000,
      icon: "❌",
    });
  } finally {
    loading.value = false;
  }
}

function excerpt(text, len = 120) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len) + "…" : text;
}

async function onDelete(id, title) {
  if (!confirm(`Hapus artikel "${title}"?`)) return;

  try {
    // Tampilkan toast loading
    const loadingToast = toast.info("Menghapus artikel...", {
      timeout: false,
      icon: "⏳",
    });

    await ArticleAPI.remove(id);

    // Hapus toast loading dan tampilkan success
    toast.dismiss(loadingToast);
    toast.success(`Artikel "${title}" berhasil dihapus`, {
      timeout: 3000,
      icon: "✅",
    });

    await fetchData();
  } catch (error) {
    console.error("Error deleting article:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      "Gagal menghapus artikel";

    toast.error(errorMessage, {
      timeout: 4000,
      icon: "❌",
    });
  }
}

onMounted(fetchData);
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0">Artikel</h5>
    <router-link class="btn btn-primary" to="/articles/new">
      <i class="fas fa-plus me-2"></i>Tambah Artikel
    </router-link>
  </div>

  <LoadingSpinner v-if="loading" />

  <div v-else class="card shadow-sm">
    <div class="table-responsive">
      <table class="table mb-0">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Slug</th>
            <th>Konten</th>
            <th>Thumbnail</th>
            <th>Estimasi (menit)</th>
            <th style="width: 140px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td class="fw-semibold">{{ article.title }}</td>
            <td>
              <span class="badge bg-primary bg-opacity-10 text-primary">
                {{ article.categoryName }}
              </span>
            </td>
            <td>
              <code class="text-muted">{{ article.slug }}</code>
            </td>
            <td class="text-muted">{{ excerpt(article.body) }}</td>
            <td>
              <img
                v-if="article.thumbnail_url"
                :src="article.thumbnail_url"
                alt="thumb"
                class="article-thumbnail"
              />
              <span v-else class="text-muted">-</span>
            </td>
            <td>
              <span class="badge bg-secondary bg-opacity-10 text-secondary">
                {{ article.read_estimation || 0 }} menit
              </span>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link
                  class="btn btn-outline-primary"
                  :to="`/articles/${article.id}`"
                  title="Edit"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <button
                  class="btn btn-outline-danger"
                  @click="onDelete(article.id, article.title)"
                  title="Hapus"
                  type="button"
                >
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

.article-thumbnail {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
}

.text-muted {
  color: #6b7280 !important;
}

.fw-semibold {
  font-weight: 600;
}

code {
  font-size: 0.8rem;
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

/* Responsive design */
@media (max-width: 992px) {
  .table-responsive {
    overflow-x: auto;
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

  .article-thumbnail {
    width: 50px;
    height: 35px;
  }
}

@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start !important;
  }

  h5 {
    font-size: 1.25rem;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
