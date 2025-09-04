<script setup>
import { ref, onMounted } from "vue";
import { ArticleAPI, CategoryAPI } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const articles = ref([]);
const categories = ref([]);
const loading = ref(true);

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

    console.log("Contoh artikel (setelah map):", articles.value[0]);
  } catch (e) {
    console.error("Error fetching articles:", e);
  } finally {
    loading.value = false;
  }
}

function excerpt(text, len = 120) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len) + "…" : text;
}

async function onDelete(id) {
  if (!confirm("Hapus artikel ini?")) return;
  await ArticleAPI.remove(id);
  await fetchData();
}

onMounted(fetchData);
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="mb-0">Artikel</h5>
    <router-link class="btn btn-primary" to="/articles/new">
      Tambah Artikel
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
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.title }}</td>
            <td>{{ article.categoryName }}</td>
            <td>{{ article.slug }}</td>
            <td>{{ excerpt(article.body) }}</td>
            <td>
              <img
                v-if="article.thumbnail_url"
                :src="article.thumbnail_url"
                alt="thumb"
                style="width: 80px"
              />
            </td>
            <td>{{ article.read_estimation }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <router-link
                  class="btn btn-outline-secondary"
                  :to="`/articles/${article.id}`"
                  >Edit</router-link
                >
                <button
                  class="btn btn-outline-danger"
                  @click="onDelete(article.id)"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
