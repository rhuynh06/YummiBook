const express = require('express');
const recipeService = require('../services/recipeService');

const router = express.Router();

// get all recipes with optional filters and pagination
router.get('/', async (req, res) => {
  try {
    const { cursor, limit, ...filters } = req.query;
    const result = await recipeService.getRecipes(filters, { cursor, limit });
    res.json(result);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});

// get recipe by id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
    }

    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

// create recipe
router.post('/', async (req, res) => {
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
      return res.status(400).json({ 
        error: 'Missing required fields: name, cuisine, mealTime, ingredients, instructions' 
      });
    }

    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array' });
    }

    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// update recipe
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID' });
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
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Basic validation
    if (ingredients && !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Ingredients must be an array' });
    }

    const updatedRecipe = await recipeService.updateRecipe(id, req.body);
    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// delete recipes
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;

    const deletedIds = await recipeService.deleteRecipes(ids);
    res.json({ deletedIds });
  } catch (error) {
    console.error('Error deleting recipes:', error);
    
    if (error.message === 'No IDs provided for deletion') {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Failed to delete recipes' });
  }
});

module.exports = router;