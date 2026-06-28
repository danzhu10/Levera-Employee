# Employee Management — Levera Technical Test

Aplikasi web sederhana untuk mengelola data karyawan (CRUD) dengan React, terhubung ke MockAPI.

## Cara Install & Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

Build production:

```bash
npm run build
npm run preview
```

## Fitur

- **Daftar karyawan** — tabel dengan nama, posisi, alamat, tanggal dibuat
- **Search & filter** — pencarian nama (debounced 300ms) + filter posisi
- **Detail karyawan** — halaman detail lengkap
- **Tambah / edit karyawan** — form dengan validasi
- **Hapus karyawan** — konfirmasi modal sebelum menghapus
- **Loading & error state** — setiap operasi API menampilkan feedback yang jelas
- **Pagination** — navigasi halaman (server-side atau client-side saat filter posisi aktif)

## Keputusan Teknis

### Vite + React + TypeScript

Vite dipilih karena startup dev server yang cepat dan dukungan TypeScript bawaan. TypeScript memberikan type safety untuk model data employee dan response API.

### TanStack Query (bukan Redux/Zustand)

Aplikasi ini hampir seluruhnya berurusan dengan **server state** (fetch, cache, invalidation setelah mutation). TanStack Query menangani loading/error/retry/cache invalidation tanpa boilerplate Redux. Tidak ada global client state kompleks yang membutuhkan state manager terpisah.

### fetch (bukan axios)

MockAPI cukup sederhana; `fetch` native sudah memenuhi kebutuhan tanpa dependency tambahan. Error handling dipusatkan di `src/api/employeeApi.ts`.

### react-hook-form + zod

Validasi form deklaratif dengan pesan error dalam Bahasa Indonesia. Schema zod bisa di-reuse dan type-safe.

### Tailwind CSS

Utility-first CSS untuk layout responsif dan komponen UI dengan cepat, tanpa file CSS terpisah yang besar.

### Search & filter posisi (hybrid)

MockAPI mendukung `?search=` dan `?page=&limit=`, tetapi **tidak** mendukung filter posisi via query param.

- **Search nama**: server-side via `?search=`
- **Filter posisi**: fetch hingga 100 record, filter client-side, lalu paginasi client-side
- **Tanpa filter posisi**: paginasi server-side (`page=1&limit=10`)

Dropdown posisi diisi dari query terpisah yang mengambil unique values dari data API.

## Struktur Project

```
src/
├── api/           # Fetch wrappers + ApiError
├── components/    # UI & employee components
├── hooks/         # TanStack Query hooks
├── pages/         # Route pages
├── types/         # TypeScript interfaces
└── lib/           # Utilities
```

## API

Base URL: `https://65264556917d673fd76bec6f.mockapi.io/api/v1/employee`

## Tech Stack

- React 19 + Vite
- TypeScript
- react-router-dom
- TanStack Query
- react-hook-form + zod
- Tailwind CSS
