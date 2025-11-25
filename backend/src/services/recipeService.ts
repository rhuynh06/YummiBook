import { PrismaClient, Food } from "../../generated/prisma/index";

const prisma: PrismaClient = new PrismaClient();

interface RecipeFilters {
  maxPrice?: string;
  mealTime?: string;
  isVegan?: string;
  isVegetarian?: string;
  maxPrepTime?: string;
  cuisine?: string;
  search?: string;
  [key: string]: any;
}

interface PaginationOptions {
  cursor?: string;
  limit?: string;
}

interface CreateRecipeData {
  name: string;
  price: number;
  cuisine: string;
  prepTime: number;
  mealTime: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  isVegan: boolean;
  isVegetarian: boolean;
  ingredients: string[];
  instructions: string;
}

interface RecipeResponse extends Omit<Food, 'ingredients'> {
  ingredients: string[];
}

interface GetRecipesResponse {
  data: RecipeResponse[];
  nextCursor: number | null;
  hasMore: boolean;
}

class RecipeService {
  /**
   * Get recipes with optional filters and pagination
   */
  async getRecipes(filters: RecipeFilters = {}, pagination: PaginationOptions = {}): Promise<GetRecipesResponse> {
    const { cursor, limit = '20' } = pagination;
    const whereClause = this.buildWhereClause(filters);

    const foods: Food[] = await prisma.food.findMany({
      where: whereClause,
      take: parseInt(limit) + 1,
      ...(cursor && {
        cursor: { id: parseInt(cursor) },
        skip: 1
      }),
      orderBy: { id: 'asc' }
    });

    const hasMore: boolean = foods.length > parseInt(limit);
    const results: Food[] = hasMore ? foods.slice(0, -1) : foods;

    // Apply case-insensitive filters in JavaScript for SQLite
    const filteredResults: Food[] = this.applyClientSideFilters(results, filters);

    return {
      data: filteredResults.map((food: Food) => this.parseIngredients(food)),
      nextCursor: hasMore && filteredResults.length > 0 ? filteredResults[filteredResults.length - 1].id : null,
      hasMore: hasMore && filteredResults.length > parseInt(limit) - 1
    };
  }

  /**
   * Build Prisma where clause from filters (without case-insensitive searches)
   */
  buildWhereClause(filters: RecipeFilters): Record<string, any> {
    const whereClause: Record<string, any> = {};
    const {
      maxPrice,
      mealTime,
      isVegan,
      isVegetarian,
      maxPrepTime
    } = filters;

    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      whereClause.price = { lte: parseFloat(maxPrice) };
    }

    if (mealTime && mealTime.trim() !== '') {
      whereClause.mealTime = mealTime.toUpperCase();
    }

    if (isVegan !== undefined && isVegan !== null && isVegan !== '') {
      whereClause.isVegan = isVegan === 'true';
    }

    if (isVegetarian !== undefined && isVegetarian !== null && isVegetarian !== '') {
      whereClause.isVegetarian = isVegetarian === 'true';
    }

    if (maxPrepTime && !isNaN(parseInt(maxPrepTime))) {
      whereClause.prepTime = { lte: parseInt(maxPrepTime) };
    }

    // Note: cuisine and search are handled client-side for SQLite
    
    return whereClause;
  }

  /**
   * Apply case-insensitive filters on the client side (for SQLite compatibility)
   */
  applyClientSideFilters(foods: Food[], filters: RecipeFilters): Food[] {
    let filtered: Food[] = foods;
    const { cuisine, search } = filters;

    // Case-insensitive cuisine filter
    if (cuisine && cuisine.trim() !== '') {
      const cuisineSearch: string = cuisine.toLowerCase();
      filtered = filtered.filter((food: Food) =>
        food.cuisine && food.cuisine.toLowerCase().includes(cuisineSearch)
      );
    }

    // Case-insensitive search across name, cuisine, and ingredients
    if (search && search.trim() !== '') {
      const searchTerm: string = search.toLowerCase();
      filtered = filtered.filter((food: Food) => {
        // Search in recipe name
        const nameMatch: boolean = !!(food.name && food.name.toLowerCase().includes(searchTerm));
        
        // Search in ingredients
        let ingredientMatch: boolean = false;
        try {
          if (food.ingredients) {
            // If ingredients is already an array
            if (Array.isArray(food.ingredients)) {
              ingredientMatch = (food.ingredients as string[]).some((ing: string) => 
                ing.toLowerCase().includes(searchTerm)
              );
            } else {
              // If ingredients is still a JSON string
              const ingredients: string[] = JSON.parse(food.ingredients as string || '[]');
              ingredientMatch = ingredients.some((ing: string) => 
                ing.toLowerCase().includes(searchTerm)
              );
            }
          }
        } catch (e) {
          console.error('Error parsing ingredients for food:', food.id, e);
        }
        
        // Search in cuisine
        const cuisineMatch: boolean = !!(food.cuisine && food.cuisine.toLowerCase().includes(searchTerm));
        
        return nameMatch || ingredientMatch || cuisineMatch;
      });
    }

    return filtered;
  }

  /**
   * Parse ingredients JSON string to array
   */
  parseIngredients(food: Food): RecipeResponse {
    try {
      return {
        ...food,
        ingredients: JSON.parse((food.ingredients as string) || '[]')
      };
    } catch (e) {
      console.error('Error parsing ingredients for food:', food.id, e);
      return {
        ...food,
        ingredients: []
      };
    }
  }

  /**
   * Get a single recipe by ID
   */
  async getRecipeById(id: number): Promise<RecipeResponse | null> {
    const recipe: Food | null = await prisma.food.findUnique({
      where: { id }
    });

    if (!recipe) return null;
    return this.parseIngredients(recipe);
  }

  /**
   * Create a new recipe
   */
  async createRecipe(data: CreateRecipeData): Promise<RecipeResponse> {
    const { ingredients, ...rest } = data;

    const newRecipe: Food = await prisma.food.create({
      data: {
        ...rest,
        ingredients: JSON.stringify(ingredients)
      }
    });

    return this.parseIngredients(newRecipe);
  }

  /**
   * Update a recipe
   */
  async updateRecipe(id: number, data: Partial<CreateRecipeData>): Promise<RecipeResponse> {
    const { ingredients, ...rest } = data;

    const updatedRecipe: Food = await prisma.food.update({
      where: { id },
      data: {
        ...rest,
        ...(ingredients && { ingredients: JSON.stringify(ingredients) })
      }
    });

    return this.parseIngredients(updatedRecipe);
  }

  /**
   * Delete recipes by IDs
   */
  async deleteRecipes(ids: number[]): Promise<number[]> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('No IDs provided for deletion');
    }

    await prisma.food.deleteMany({
      where: { id: { in: ids } }
    });

    return ids;
  }

  /**
   * Check if a recipe exists
   */
  async recipeExists(id: number): Promise<boolean> {
    const count: number = await prisma.food.count({
      where: { id }
    });
    return count > 0;
  }
}

export default new RecipeService();