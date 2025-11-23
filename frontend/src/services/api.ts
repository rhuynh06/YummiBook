import { BACKEND_URL } from '../config';
import type { Recipe, FilterOptions } from '../types/recipe';

const site = BACKEND_URL;

// Add pagination response type
interface PaginatedResponse<T> {
  data: T[];
  nextCursor: number | null;
  hasMore: boolean;
}

export const api = {
  // Get all recipes with pagination
  async getAllRecipes(cursor?: number | null, limit: number = 20): Promise<PaginatedResponse<Recipe>> {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor.toString());
    params.append('limit', limit.toString());
    
    const response = await fetch(`${site}/api/recipes?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },
  
  // Get recipe by ID (UNCHANGED)
  async getRecipeByID(id: number): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe by id');
    }
    return response.json();
  },
  
  // Filter recipes with pagination
  async filterRecipes(
    filters: FilterOptions, 
    cursor?: number | null, 
    limit: number = 20
  ): Promise<PaginatedResponse<Recipe>> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    if (cursor) params.append('cursor', cursor.toString());
    params.append('limit', limit.toString());
    
    const response = await fetch(`${site}/api/recipes/filter?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to filter recipes');
    }
    return await response.json();
  },
  
  // Add, update, delete (UNCHANGED)
  async addRecipe(newRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    });
    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }
    return await response.json();
  },

  async updateRecipe(id: number, updatedRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe),
    });
    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }
    return await response.json();
  },

  async deleteRecipes(ids: number[]): Promise<void> {
    const response = await fetch(`${site}/api/recipes`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) throw new Error('Failed to delete recipes');
  }
};