import express, { Router, Request, Response } from 'express';
import recipeService from '../services/recipeService';

const router: Router = express.Router();

interface RecipeFilters {
  [key: string]: any;
}

interface PaginationOptions {
  cursor?: string;
  limit?: string;
}

interface CreateRecipeBody {
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

// get all recipes with optional filters and pagination
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { cursor, limit, ...filters } = req.query as RecipeFilters & PaginationOptions;
    const result = await recipeService.getRecipes(filters, { cursor, limit });
    res.json(result);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// get recipe by id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid recipe ID' });
      return;
    }

    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

// create recipe
router.post('/', async (req: Request<{}, {}, CreateRecipeBody>, res: Response): Promise<void> => {
  try {
    const {
      name,
      price,
      cuisine,
      prepTime,
      mealTime,
      isVegan,
      isVegetarian,
      ingredients,
      instructions
    } = req.body;

    // Basic validation
    if (!name || !cuisine || !mealTime || !ingredients || !instructions) {
      res.status(400).json({ 
        error: 'Missing required fields: name, cuisine, mealTime, ingredients, instructions' 
      });
      return;
    }

    if (!Array.isArray(ingredients)) {
      res.status(400).json({ error: 'Ingredients must be an array' });
      return;
    }

    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// update recipe
router.put('/:id', async (req: Request<{ id: string }, {}, Partial<CreateRecipeBody>>, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid recipe ID' });
      return;
    }

    const {
      name,
      price,
      cuisine,
      prepTime,
      mealTime,
      isVegan,
      isVegetarian,
      ingredients,
      instructions
    } = req.body;

    // Check if recipe exists
    const exists = await recipeService.recipeExists(id);
    if (!exists) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    // Basic validation
    if (ingredients && !Array.isArray(ingredients)) {
      res.status(400).json({ error: 'Ingredients must be an array' });
      return;
    }

    const updatedRecipe = await recipeService.updateRecipe(id, req.body);
    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// delete recipes
router.delete('/', async (req: Request<{}, {}, { ids: number[] }>, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;

    const deletedIds = await recipeService.deleteRecipes(ids);
    res.json({ deletedIds });
  } catch (error) {
    console.error('Error deleting recipes:', error);
    
    if (error instanceof Error && error.message === 'No IDs provided for deletion') {
      res.status(400).json({ error: error.message });
      return;
    }
    
    res.status(500).json({ error: 'Failed to delete recipes' });
  }
});

export default router;