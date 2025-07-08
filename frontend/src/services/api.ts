import { BACKEND_URL } from '../config';
import type { Recipe, FilterOptions } from '../types/recipe';

const site = BACKEND_URL;

export const api = {
  // Get all recipes
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${site}/api/recipes`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return response.json();
  },

  // Get recipe by ID
  async getRecipeByID(id: number): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes/${id}`);
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

    const response = await fetch(`${site}/api/recipes/filter?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to filter recipes');
    }
    return await response.json();
  },

  // Add a new recipe
  async addRecipe(newRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    });

    if (!response.ok) {
      console.log('Posting to: ', `${site}/api/recipes`);
      throw new Error('Failed to add recipe');
    }

    return await response.json();
  },

  // Update an existing recipe
  async updateRecipe(id: number, updatedRecipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${site}/api/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRecipe),
    });

    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }

    return await response.json();
  },

  // Delete a recipe (only works on localhost backend)
  async deleteRecipes(ids: number[]): Promise<void> {
    const response = await fetch(`${site}/api/recipes`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) throw new Error('Failed to delete recipes');
  }
};
