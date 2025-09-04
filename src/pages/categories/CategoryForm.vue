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
          <button class="btn btn-primary" :disabled="saving">Simpan</button>
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

const route = useRoute();
const router = useRouter();
const form = reactive({
  name: "",
  slug: "",
  description: "",
});
const saving = ref(false);
const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEdit.value) {
    const data = await CategoryAPI.detail(route.params.id);
    form.name = data.name;
    form.slug = data.slug; 
    form.description = data.description;
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
      alert('Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung. Min. 3 karakter.');
      return;
    }

    const formData = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim().replace(/\n/g, ' '),
    };

    console.log('Mengirim kategori:', formData);

    if (isEdit.value) {
      await CategoryAPI.update(route.params.id, formData);
    } else {
      await CategoryAPI.create(formData);
    }

    router.push("/categories");
  } catch (error) {
    console.error('Terjadi kesalahan saat mengirim data:', error);
  } finally {
    saving.value = false;
  }
}

function isValidSlug(slug) {
  const regex = /^[a-z0-9-]+$/;
  return regex.test(slug) && slug.trim().length >= 3;
}

function formatSlug(slug) {
  return slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
</script>
