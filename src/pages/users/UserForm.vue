<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="mb-3">{{ isEdit ? "Edit" : "Tambah" }} User</h5>

      <form @submit.prevent="onSubmit" novalidate>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input
            v-model.trim="form.username"
            class="form-control"
            required
            autocomplete="off"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model.trim="form.email"
            type="email"
            class="form-control"
            required
            autocomplete="off"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">
            {{ isEdit ? "Password (isi jika ingin ganti)" : "Password" }}
          </label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            :required="!isEdit"
            autocomplete="new-password"
          />
          <small v-if="isEdit" class="text-muted">
            Biarkan kosong jika tidak ingin mengganti password.
          </small>
        </div>

        <div v-if="errorMsg" class="alert alert-danger py-2">
          <pre class="m-0" style="white-space: pre-wrap">{{ errorMsg }}</pre>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-primary" :disabled="saving">
            {{ saving ? "Menyimpan..." : "Simpan" }}
          </button>
          <router-link class="btn btn-outline-secondary" to="/users">
            Kembali
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserAPI } from "@/services/api";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const saving = ref(false);
const errorMsg = ref("");

const form = reactive({
  username: "",
  email: "",
  password: "",
});

onMounted(async () => {
  if (!isEdit.value) return;
  try {
    const data = await UserAPI.detail(route.params.id);
    form.username = data?.username ?? "";
    form.email = data?.email ?? "";
    form.password = "";
  } catch (e) {
    errorMsg.value = extractErrors(e);
    console.error("Gagal memuat detail user:", e?.response?.data || e);
  }
});

async function onSubmit() {
  errorMsg.value = "";
  saving.value = true;

  try {
    const payload = {
      username: form.username?.trim(),
      email: form.email?.trim(),
      role: [],
    };

    if (!isEdit.value) {
      if (!form.password || !form.password.trim()) {
        errorMsg.value = "Password wajib diisi saat membuat user baru.";
        saving.value = false;
        return;
      }
      payload.password = form.password;
    } else if (form.password && form.password.trim()) {
      payload.password = form.password;
    }

    if (isEdit.value) {
      await UserAPI.update(route.params.id, payload);
    } else {
      await UserAPI.create(payload);
    }

    router.push("/users");
  } catch (e) {
    errorMsg.value = extractErrors(e);
    console.error("Gagal menyimpan user:", e?.response?.data || e);
  } finally {
    saving.value = false;
  }
}

function extractErrors(err) {
  const res = err?.response;
  const data = res?.data;
  if (!data) return err?.message || "Terjadi kesalahan.";
  if (typeof data === "string") return data;

  try {
    return Object.entries(data)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
      .join("\n");
  } catch {
    return JSON.stringify(data, null, 2);
  }
}
</script>
