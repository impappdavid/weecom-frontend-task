import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
}


const getAllProducts = async (
  page: number,
  searchTerm: string,
  limit = 15
): Promise<{ products: Product[]; total: number }> => {
  const skip = (page - 1) * limit;
  const url = searchTerm
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  const res = await axios.get(url);
  return res.data;
};

export function useProducts(page: number, searchTerm: string) {
  const limit = 15;
  return useQuery({
    queryKey: ['products', page, searchTerm],
    queryFn: () => getAllProducts(page, searchTerm, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export const addProduct = async (newProduct: Omit<Product, 'id'>): Promise<Product> => {
  const response = await axios.post<Product>('https://dummyjson.com/products/add', newProduct);
  return response.data;
};

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export const editProduct = async (updatedProduct: Product): Promise<Product> => {
  const { id, ...data } = updatedProduct;
  const response = await axios.put<Product>(`https://dummyjson.com/products/${id}`, data);
  return response.data;
};

export function useEditProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
};

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}