import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
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