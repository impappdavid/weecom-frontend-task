# weecom-frontend-task

A CRUD product management dashboard built with **React**, **TypeScript**, **Vite**, **shadcn/ui**, and **React Query**.

## Features

- **Product Table**: Paginated, searchable table of products
- **Add Product**: Dialog/modal form to add new products
- **Edit Product**: Dialog/modal with prefilled fields to update product info
- **Delete Product**: Remove products with confirmation
- **Live Updates**: Auto-refetch table after add/edit/delete (no manual reload)
- **Loading and Error States**: Smooth skeleton loader and error feedback
- **Responsive UI**: Optimized for both desktop and mobile
- **Modern Stack**: Powered by Vite, shadcn/ui, React Query, and TypeScript

## Screenshots

**Home:**
![Product Table](/screenshots/home.png)

**Add product dialog:**
![Add Product](/screenshots/add.png)

**Edit product dialog:**
![Edit Product](/screenshots/edit.png)

**Delete product dialog:**
![Delete Product](/screenshots/delete.png)

**Loading products:**
![Loading Product](/screenshots/load.png)

**Searching products:**
![Searching Product](/screenshots/search.png)

**Notification:**
![Notification](/screenshots/toast.png)

##  Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/impappdavid/weecom-frontend-task.git
cd weecom-frontend-task
```

2. **Install dependencies**
```bash
npm install
```
**OR**
```bash
yarn install
```

3. **Run in development**
```bash
npm run dev
```
**OR**
```bash
yarn dev
```

4. **Visit**
```bash
http://localhost:5173/
```


## Tech Stack

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)

## Structure

- `src/components/` - UI elements (Table, Dialog, Inputs, etc.)
- `src/api/` - Product API hooks (add, edit, delete, query)
- `src/pages/` or root `src/` - Main app screens

## CRUD Operations

- **Create:** Add new product with `Add` dialog
- **Read:** Paginated table with search
- **Update:** Edit dialog prefilled with product data
- **Delete:** Remove a product, with table auto-refetch

## Author

- [impappdavid](https://github.com/impappdavid)

---

> _This project was created as a frontend technical test and demonstrates best practices in React, UI composition, and state management._

