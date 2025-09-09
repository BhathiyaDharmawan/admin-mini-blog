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

        <div class="d-flex gap-2">
          <button class="btn btn-primary" :disabled="saving" type="submit">
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
import { useToast } from "vue-toastification";  // Import useToast

const route = useRoute();
const router = useRouter();
const toast = useToast();  // Inisialisasi toast

const isEdit = computed(() => !!route.params.id);
const saving = ref(false);

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
    toast.error("Gagal memuat detail user", {
      timeout: 3000,
      icon: '❌'
    });
    console.error("Gagal memuat detail user:", e?.response?.data || e);
  }
});

async function onSubmit() {
  saving.value = true;

  try {
    const payload = {
      username: form.username?.trim(),
      email: form.email?.trim(),
      role: [],
    };

    if (!isEdit.value) {
      if (!form.password || !form.password.trim()) {
        toast.error("Password wajib diisi saat membuat user baru.", {
          timeout: 3000,
          icon: '❌'
        });
        saving.value = false;
        return;
      }
      payload.password = form.password;
    } else if (form.password && form.password.trim()) {
      payload.password = form.password;
    }

    if (isEdit.value) {
      await UserAPI.update(route.params.id, payload);
      toast.success("User berhasil diperbarui!", {
        timeout: 3000,
        icon: '✅'
      });
    } else {
      await UserAPI.create(payload);
      toast.success("User berhasil ditambahkan!", {
        timeout: 3000,
        icon: '➕'
      });
    }

    router.push("/users");
  } catch (e) {
    toast.error(extractErrors(e), {
      timeout: 4000,
      icon: '❌'
    });
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
