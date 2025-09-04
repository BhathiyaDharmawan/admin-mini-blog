import axios from "axios";

const TOKEN_KEY = "mb_token";
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function login(payload) {
  const res = await api.post("/api/auth/login", payload);
  return res.data?.data ?? res.data;
}

export const CategoryAPI = {
  list: async () => (await api.get("/admin/api/blog/category")).data,
  create: async (payload) => {
    console.log("Mencoba membuat kategori dengan:", payload);
    return (await api.post("/admin/api/blog/category", payload)).data;
  },
  detail: async (id) => (await api.get(`/admin/api/blog/category/${id}`)).data,
  update: async (id, payload) => {
    console.log(
      "Mencoba mengupdate kategori dengan ID:",
      id,
      "dan data:",
      payload
    );
    return (await api.put(`/admin/api/blog/category/${id}`, payload)).data;
  },
  remove: async (id) =>
    (await api.delete(`/admin/api/blog/category/${id}`)).data,
};

export const ArticleAPI = {
  list: async () => {
    try {
      const response = await api.get("/admin/api/blog/article");
      return response.data; // Pastikan data diterima dengan benar
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },
  create: async (payload) =>
    (await api.post("/admin/api/blog/article", payload)).data,
  detail: async (id) => (await api.get(`/admin/api/blog/article/${id}`)).data,
  update: async (id, payload) =>
    (await api.put(`/admin/api/blog/article/${id}`, payload)).data,
  remove: async (id) =>
    (await api.delete(`/admin/api/blog/article/${id}`)).data,
};

export const UserAPI = {
  list: async () => (await api.get("/admin/api/user")).data,
  create: async (payload) => (await api.post("/admin/api/user", payload)).data,
  detail: async (id) => (await api.get(`/admin/api/user/${id}`)).data,
  update: async (id, payload) =>
    (await api.put(`/admin/api/user/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/admin/api/user/${id}`)).data,
};

export const GroupAPI = {
  list: async () => (await api.get("/admin/api/group")).data,
};
