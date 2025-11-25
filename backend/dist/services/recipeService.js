"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../generated/prisma/index");
const prisma = new index_1.PrismaClient();
class RecipeService {
    /**
     * Get recipes with optional filters and pagination
     */
    async getRecipes(filters = {}, pagination = {}) {
        const { cursor, limit = '20' } = pagination;
        const whereClause = this.buildWhereClause(filters);
        const foods = await prisma.food.findMany({
            where: whereClause,
            take: parseInt(limit) + 1,
            ...(cursor && {
                cursor: { id: parseInt(cursor) },
                skip: 1
            }),
            orderBy: { id: 'asc' }
        });
        const hasMore = foods.length > parseInt(limit);
        const results = hasMore ? foods.slice(0, -1) : foods;
        // Apply case-insensitive filters in JavaScript for SQLite
        const filteredResults = this.applyClientSideFilters(results, filters);
        return {
            data: filteredResults.map((food) => this.parseIngredients(food)),
            nextCursor: hasMore && filteredResults.length > 0 ? filteredResults[filteredResults.length - 1].id : null,
            hasMore: hasMore && filteredResults.length > parseInt(limit) - 1
        };
    }
    /**
     * Build Prisma where clause from filters (without case-insensitive searches)
     */
    buildWhereClause(filters) {
        const whereClause = {};
        const { maxPrice, mealTime, isVegan, isVegetarian, maxPrepTime } = filters;
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
    applyClientSideFilters(foods, filters) {
        let filtered = foods;
        const { cuisine, search } = filters;
        // Case-insensitive cuisine filter
        if (cuisine && cuisine.trim() !== '') {
            const cuisineSearch = cuisine.toLowerCase();
            filtered = filtered.filter((food) => food.cuisine && food.cuisine.toLowerCase().includes(cuisineSearch));
        }
        // Case-insensitive search across name, cuisine, and ingredients
        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            filtered = filtered.filter((food) => {
                // Search in recipe name
                const nameMatch = !!(food.name && food.name.toLowerCase().includes(searchTerm));
                // Search in ingredients
                let ingredientMatch = false;
                try {
                    if (food.ingredients) {
                        // If ingredients is already an array
                        if (Array.isArray(food.ingredients)) {
                            ingredientMatch = food.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm));
                        }
                        else {
                            // If ingredients is still a JSON string
                            const ingredients = JSON.parse(food.ingredients || '[]');
                            ingredientMatch = ingredients.some((ing) => ing.toLowerCase().includes(searchTerm));
                        }
                    }
                }
                catch (e) {
                    console.error('Error parsing ingredients for food:', food.id, e);
                }
                // Search in cuisine
                const cuisineMatch = !!(food.cuisine && food.cuisine.toLowerCase().includes(searchTerm));
                return nameMatch || ingredientMatch || cuisineMatch;
            });
        }
        return filtered;
    }
    /**
     * Parse ingredients JSON string to array
     */
    parseIngredients(food) {
        try {
            return {
                ...food,
                ingredients: JSON.parse(food.ingredients || '[]')
            };
        }
        catch (e) {
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
    async getRecipeById(id) {
        const recipe = await prisma.food.findUnique({
            where: { id }
        });
        if (!recipe)
            return null;
        return this.parseIngredients(recipe);
    }
    /**
     * Create a new recipe
     */
    async createRecipe(data) {
        const { ingredients, ...rest } = data;
        const newRecipe = await prisma.food.create({
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
    async updateRecipe(id, data) {
        const { ingredients, ...rest } = data;
        const updatedRecipe = await prisma.food.update({
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
    async deleteRecipes(ids) {
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
    async recipeExists(id) {
        const count = await prisma.food.count({
            where: { id }
        });
        return count > 0;
    }
}
exports.default = new RecipeService();
