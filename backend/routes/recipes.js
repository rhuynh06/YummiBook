// backend code for sorting filter stuff

const express = require('express');
const {PrismaClient} = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

// Get All Recipes WITH PAGINATION
router.get('/', async (req, res) => {
  try {
      const { cursor, limit = 20 } = req.query;
      
      // Fetch limit + 1 to check if more exist
      const foods = await prisma.food.findMany({
          take: parseInt(limit) + 1,
          ...(cursor && {
              cursor: { id: parseInt(cursor) },
              skip: 1  // Skip the cursor itself
          }),
          orderBy: { id: 'asc' }
      });
      
      // Check if there are more results
      const hasMore = foods.length > parseInt(limit);
      const results = hasMore ? foods.slice(0, -1) : foods;
      
      // Parse ingredients for frontend
      const foodsWithParsedIngredients = results.map(food => ({
          ...food,
          ingredients: JSON.parse(food.ingredients || '[]')
      }));
      
      res.json({
          data: foodsWithParsedIngredients,
          nextCursor: hasMore ? results[results.length - 1].id : null,
          hasMore
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Error fetching foods'});
  }
});

// Filter Recipes WITH PAGINATION
router.get('/filter', async (req, res) => {
    const {
        cuisine,
        maxPrice,
        mealTime,
        isVegan,
        isVegetarian,
        search,
        maxPrepTime,
        cursor,
        limit = 20
    } = req.query;

    try {
        // Build where clause (SAME AS BEFORE)
        const whereClause = {};
        
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

        // Fetch with pagination (NEW)
        let foods = await prisma.food.findMany({
            where: whereClause,
            take: parseInt(limit) + 1,
            ...(cursor && {
                cursor: { id: parseInt(cursor) },
                skip: 1
            }),
            orderBy: { id: 'asc' }
        });

        // Client-side filters (SAME AS BEFORE)
        if (cuisine && cuisine.trim() !== '') {
            foods = foods.filter(food =>
                food.cuisine && food.cuisine.toLowerCase().includes(cuisine.toLowerCase())
            );
        }

        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            foods = foods.filter(food => {
                const nameMatch = food.name.toLowerCase().includes(searchTerm);
                
                let ingredientMatch = false;
                try {
                    const ingredients = JSON.parse(food.ingredients || '[]');
                    ingredientMatch = ingredients.some(ing => 
                        ing.toLowerCase().includes(searchTerm)
                    );
                } catch (e) {
                    console.error('Error parsing ingredients for food:', food.id, e);
                }
                
                const cuisineMatch = food.cuisine.toLowerCase().includes(searchTerm);
                
                return nameMatch || ingredientMatch || cuisineMatch;
            });
        }

        // Check if more results (NEW)
        const hasMore = foods.length > parseInt(limit);
        const results = hasMore ? foods.slice(0, -1) : foods;

        // Parse ingredients (SAME AS BEFORE)
        const foodsWithParsedIngredients = results.map(food => {
            try {
                return {
                    ...food,
                    ingredients: JSON.parse(food.ingredients || '[]')
                };
            } catch (e) {
                console.error('Error parsing ingredients for food:', food.id, e);
                return {
                    ...food,
                    ingredients: []
                };
            }
        });

        res.json({
            data: foodsWithParsedIngredients,
            nextCursor: hasMore ? results[results.length - 1].id : null,
            hasMore
        });
    } catch (error) {
        console.error('Filter error:', error);
        res.status(500).json({error: 'Error fetching foods'});
    }
});

// Get Food Recipe
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const recipe = await prisma.food.findUnique({
      where: { id }
    });

    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    recipe.ingredients = JSON.parse(recipe.ingredients || '[]');
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

// Add Recipe
router.post('/', async (req, res) => {
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

  try {
    const newRecipe = await prisma.food.create({
      data: {
        name,
        price,
        cuisine,
        prepTime,
        mealTime,
        isVegan,
        isVegetarian,
        ingredients: JSON.stringify(ingredients),
        instructions
      },
    });

    newRecipe.ingredients = JSON.parse(newRecipe.ingredients || '[]');
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Update Recipe
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
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

  try {
    const updatedRecipe = await prisma.food.update({
      where: { id },
      data: {
        name,
        price,
        cuisine,
        prepTime,
        mealTime,
        isVegan,
        isVegetarian,
        ingredients: JSON.stringify(ingredients),
        instructions,
      },
    });

    updatedRecipe.ingredients = JSON.parse(updatedRecipe.ingredients || '[]');
    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// Delete Recipe (only allowed from localhost for management purposes)
router.delete('/', async (req, res) => {
  const { ids } = req.body; // ex: { ids: [1, 2, 3] }
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'No IDs provided for deletion' });
  }

  try {
    await prisma.food.deleteMany({
      where: { id: { in: ids } },
    });
    res.json({ deletedIds: ids });
  } catch (error) {
    console.error('Error deleting recipes:', error);
    res.status(500).json({ error: 'Failed to delete recipes' });
  }
});



module.exports = router;