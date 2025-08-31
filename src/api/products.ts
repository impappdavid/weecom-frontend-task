import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    stock: number;
}


const getAllProducts = async (page: number, limit = 15): Promise<{ products: Product[]; total: number }> => {
    const skip = (page - 1) * limit;
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return res.data;
}

export function useProducts(page: number) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => getAllProducts(page),
    staleTime: 5 * 60 * 1000,
  });
}