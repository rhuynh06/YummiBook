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

  // Get recipe by ID
  async getRecipeByID(id: number): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe by id');
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
    return await response.json();
  },

  // Add Recipe
  async addRecipe(newRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    });

    if (!response.ok) {
      console.log('Posting to: ', API_BASE_URL);
      throw new Error('Failed to add recipe');
    }

    return await response.json();
  },

  // Update (Edit) Recipe by ID
  async updateRecipe(id: number, updatedRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT', // or PATCH depending on your backend
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRecipe),
    });

    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }

    return await response.json();
  }
};