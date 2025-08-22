import { Config } from "@/config/Config";

// Server-side API utility functions
class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Config.BACKEND_API_URL;
  }

  private async fetchWithCache(url: string, options: RequestInit = {}, cacheTime: number = 300) {
    const response = await fetch(url, {
      ...options,
      next: { 
        revalidate: cacheTime,
        tags: [url] 
      },
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Product API methods
  async getFeaturedProducts() {
    return this.fetchWithCache(`${this.baseUrl}/products/featured-products`, {}, 600); // 10 minutes
  }

  async getProductDetails(slug: string) {
    // Increase cache time for product details to improve performance
    return this.fetchWithCache(`${this.baseUrl}/products/${slug}`, {}, 1800); // 30 minutes
  }

  async getProductsByCategory(categoryId: string, limit: number = 12, page: number = 1, subId?: string) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(subId && { sub_id: subId })
    });
    
    return this.fetchWithCache(
      `${this.baseUrl}/products/load-by-categories/${categoryId}?${params}`, 
      {}, 
      600 // 10 minutes for category products
    );
  }

  async getAllProductsGroupByCategories() {
    return this.fetchWithCache(`${this.baseUrl}/products/group-by-category`, {}, 600);
  }

  async getRelatedProducts(slug: string, page: number = 1) {
    // Cache related products for longer to improve performance
    return this.fetchWithCache(
      `${this.baseUrl}/products/related-products/${slug}?page=${page}`, 
      {}, 
      900 // 15 minutes for related products
    );
  }

  async searchProducts(query: string) {
    return this.fetchWithCache(`${this.baseUrl}/products/search${query}`, {}, 60); // 1 minute for search
  }

  // Collection API methods
  async getAllCollections() {
    return this.fetchWithCache(`${this.baseUrl}/collections`, {}, 600);
  }

  async getProductsByCollectionSlug(slug: string) {
    return this.fetchWithCache(`${this.baseUrl}/collections/get-products-by-collection/${slug}`, {}, 300);
  }

  async getAllCollectionsWithProducts() {
    return this.fetchWithCache(`${this.baseUrl}/collections/view-with-products`, {}, 600);
  }

  // Category API methods
  async getCategoriesByProductCount() {
    return this.fetchWithCache(`${this.baseUrl}/categories/by-product-count`, {}, 600);
  }

  async getCategoriesWithSubcategories() {
    return this.fetchWithCache(`${this.baseUrl}/categories/with-subcategories`, {}, 600);
  }

  // User API methods (requires auth)
  async getUserOrders(limit: number = 10, page: number = 1, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.fetchWithCache(
      `${this.baseUrl}/users/orders?limit=${limit}&page=${page}`, 
      { headers }, 
      60 // 1 minute for user data
    );
  }

  async getOrderDetails(id: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.fetchWithCache(
      `${this.baseUrl}/users/orders/${id}`, 
      { headers }, 
      60
    );
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Helper function to handle errors consistently
export function handleApiError(error: any) {
  console.error('API Error:', error);
  return {
    error: true,
    message: error.message || 'An error occurred while fetching data',
  };
}

// Type definitions for API responses
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
