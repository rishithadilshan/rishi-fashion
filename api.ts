import axios, { type AxiosInstance } from 'axios'
import type { ProductListResponse, Product } from '@/types/product'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

const client: AxiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export const ProductService = {
  /**
   * Fetch a page of products. DummyJSON's "womens-dresses" and
   * "womens-bags" categories stand in for the saree / accessories catalogue.
   */
  async getAll(limit = 12, skip = 0): Promise<ProductListResponse> {
    const { data } = await client.get<ProductListResponse>('/products', {
      params: { limit, skip },
    })
    return data
  },

  async getByCategory(category: string, limit = 20): Promise<ProductListResponse> {
    const { data } = await client.get<ProductListResponse>(
      `/products/category/${category}`,
      { params: { limit } },
    )
    return data
  },

  async search(query: string): Promise<ProductListResponse> {
    const { data } = await client.get<ProductListResponse>('/products/search', {
      params: { q: query },
    })
    return data
  },

  async getById(id: number): Promise<Product> {
    const { data } = await client.get<Product>(`/products/${id}`)
    return data
  },

  async getCategories(): Promise<string[]> {
    const { data } = await client.get<string[]>('/products/category-list')
    return data
  },
}

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await client.post<LoginResponse>('/auth/login', {
      ...credentials,
      expiresInMins: 60,
    })
    return data
  },
}
