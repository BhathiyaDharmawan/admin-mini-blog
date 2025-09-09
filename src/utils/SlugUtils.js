// Fungsi untuk memvalidasi slug
export function isValidSlug(slug) {
  const regex = /^[a-z0-9-]+$/;
  return regex.test(slug) && slug.trim().length >= 3;
}

// Fungsi untuk memformat slug
export function formatSlug(slug) {
  return slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
