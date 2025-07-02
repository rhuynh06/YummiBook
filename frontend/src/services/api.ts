import type { Recipe, FilterOptions } from '../types/recipe';

const API_BASE_URL = 'http://localhost:5050/api/recipes';

export const api = {
  // Get all recipes
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },

  // Filter recipes
  async filterRecipes(filters: FilterOptions): Promise<Recipe[]> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/filter?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to filter recipes');
    }
    return await response.json(); //changed to await response.json() to ensure proper JSON parsing
  }
}; 