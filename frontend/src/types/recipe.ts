export interface Recipe {
  id: number;
  name: string;
  price: number;
  cuisine: string;
  prepTime: number;
  mealTime: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  isVegan: boolean;
  isVegetarian: boolean;
  ingredients: string[];
}

export interface FilterOptions {
  cuisine?: string;
  maxPrice?: number;
  mealTime?: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  ingredient?: string;
  maxPrepTime?: number;
} 