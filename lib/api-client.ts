"use client";

import { Config } from "@/config/Config";

/**
 * Enhanced client-side API client with better error handling and retries
 */
class ClientApiService {
  private baseUrl: string;
  private maxRetries: number = 2;

  constructor() {
    this.baseUrl = Config.BACKEND_API_URL;
  }

  /**
   * Get authentication token from local storage
   */
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  /**
   * Fetch API with error handling and retry capabilities
   */
  async fetchApi<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Handle different header types
    if (options.headers) {
      if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
        Object.assign(headers, options.headers);
      }
    }

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      console.log(`[API Client] Fetching: ${url}`);
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`[API Client] Error fetching ${url}:`, error);
      
      // Retry logic for network errors
      if (retryCount < this.maxRetries) {
        console.log(`[API Client] Retrying... (${retryCount + 1}/${this.maxRetries})`);
        
        // Exponential backoff delay
        const delay = 2 ** retryCount * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.fetchApi<T>(endpoint, options, retryCount + 1);
      }
      
      // If we've exhausted retries, throw a user-friendly error
      throw new Error(`Failed to connect to the API server. Please check your connection.`);
    }
  }

  // Product-related methods
  async getFeaturedProducts() {
    return this.fetchApi('/products/featured-products');
  }

  async getProductDetails(slug: string) {
    return this.fetchApi(`/products/${slug}`);
  }

  async getProductsByCategory(categoryId: string, options = { limit: 12, page: 1, subId: null }) {
    const { limit, page, subId } = options;
    let url = `/products/load-by-categories/${categoryId}?limit=${limit}&page=${page}`;
    
    if (subId) {
      url += `&sub_id=${subId}`;
    }
    
    return this.fetchApi(url);
  }

  // Category-related methods
  async getAllCategories() {
    return this.fetchApi('/categories');
  }

  async getCategoriesWithSubcategories() {
    return this.fetchApi('/categories/with-subcategories');
  }

  // Collection-related methods
  async getCollections() {
    return this.fetchApi('/collections');
  }

  async getCollectionWithProducts(slug: string) {
    return this.fetchApi(`/collections/get-products-by-collection/${slug}`);
  }
}

// Export as singleton
export const clientApi = new ClientApiService();

