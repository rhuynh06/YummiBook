import type { Recipe, FilterOptions } from '../types/recipe';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

interface PaginatedResponse {
  data: Recipe[];
  nextCursor: number | null;
  hasMore: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetchJson<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  private buildQueryParams(
    filters: FilterOptions = {},
    pagination: { cursor?: number | null; limit?: number } = {}
  ): URLSearchParams {
    const params = new URLSearchParams();

    // Pagination
    if (pagination.limit) {
      params.append('limit', pagination.limit.toString());
    }
    if (pagination.cursor) {
      params.append('cursor', pagination.cursor.toString());
    }

    // Filters
    if (filters.cuisine) {
      params.append('cuisine', filters.cuisine);
    }
    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.mealTime) {
      params.append('mealTime', filters.mealTime);
    }
    if (filters.isVegan !== undefined) {
      params.append('isVegan', filters.isVegan.toString());
    }
    if (filters.isVegetarian !== undefined) {
      params.append('isVegetarian', filters.isVegetarian.toString());
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.maxPrepTime !== undefined) {
      params.append('maxPrepTime', filters.maxPrepTime.toString());
    }

    return params;
  }

  async getAllRecipes(
    cursor?: number | null,
    limit: number = 20
  ): Promise<PaginatedResponse> {
    const params = this.buildQueryParams({}, { cursor, limit });
    return this.fetchJson<PaginatedResponse>(`/api/recipes?${params}`);
  }

  async filterRecipes(
    filters: FilterOptions,
    cursor?: number | null,
    limit: number = 20
  ): Promise<PaginatedResponse> {
    const params = this.buildQueryParams(filters, { cursor, limit });
    return this.fetchJson<PaginatedResponse>(`/api/recipes?${params}`);
  }

  async getRecipes(
    filters: FilterOptions = {},
    cursor?: number | null,
    limit: number = 20
  ): Promise<PaginatedResponse> {
    const params = this.buildQueryParams(filters, { cursor, limit });
    return this.fetchJson<PaginatedResponse>(`/api/recipes?${params}`);
  }

  async getRecipeById(id: number): Promise<Recipe> {
    return this.fetchJson<Recipe>(`/api/recipes/${id}`);
  }

  async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    return this.fetchJson<Recipe>('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  }

  async updateRecipe(id: number, recipe: Partial<Recipe>): Promise<Recipe> {
    return this.fetchJson<Recipe>(`/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
    });
  }

  async deleteRecipes(ids: number[]): Promise<{ deletedIds: number[] }> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('No IDs provided for deletion');
    }

    return this.fetchJson<{ deletedIds: number[] }>('/api/recipes', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  }

  async deleteRecipe(id: number): Promise<{ deletedIds: number[] }> {
    return this.deleteRecipes([id]);
  }
}

// Export singleton instance
export const api = new ApiService(API_BASE_URL);

// Export the class for testing purposes
export { ApiService };