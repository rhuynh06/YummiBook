// src/types/recipe.ts
export interface Recipe {
  id: number;
  name: string;
  price: number;
  cuisine: string;
  prepTime: number;
  mealTime: string;
  isVegan: boolean;
  isVegetarian: boolean;
  ingredients: string[];
  instructions?: string;
}

export interface FilterOptions {
  cuisine?: string;
  maxPrice?: number;
  mealTime?: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  search?: string;
  maxPrepTime?: number;
} 