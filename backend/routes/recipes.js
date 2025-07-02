// backend code for sorting filter stuff

const express = require('express');
const {PrismaClient} = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const foods = await prisma.food.findMany();
        // Parse ingredients JSON string to array for frontend
        const foodsWithParsedIngredients = foods.map(food => ({
            ...food,
            ingredients: JSON.parse(food.ingredients || '[]')
        }));
        res.json(foodsWithParsedIngredients);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error fetching foods'});
    }
});

// Filter recipes
router.get('/filter', async (req, res) => {
    const {
        cuisine,
        maxPrice,
        mealTime,
        isVegan,
        isVegetarian,
        search,
        maxPrepTime
    } = req.query

    try {
        // Build where clause for Prisma
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

        let foods = await prisma.food.findMany({
            where: whereClause
        });

        // Case-insensitive cuisine filter in JS
        if (cuisine && cuisine.trim() !== '') {
            foods = foods.filter(food =>
                food.cuisine && food.cuisine.toLowerCase().includes(cuisine.toLowerCase())
            );
        }

        // Filter by search term if provided (search by name and ingredients)
        if (search && search.trim() !== '') {
            const searchTerm = search.toLowerCase();
            foods = foods.filter(food => {
                // Search in recipe name
                const nameMatch = food.name.toLowerCase().includes(searchTerm);
                
                // Search in ingredients
                let ingredientMatch = false;
                try {
                    const ingredients = JSON.parse(food.ingredients || '[]');
                    ingredientMatch = ingredients.some(ing => 
                        ing.toLowerCase().includes(searchTerm)
                    );
                } catch (e) {
                    console.error('Error parsing ingredients for food:', food.id, e);
                }
                
                // Search in cuisine
                const cuisineMatch = food.cuisine.toLowerCase().includes(searchTerm);
                
                return nameMatch || ingredientMatch || cuisineMatch;
            });
        }

        // Parse ingredients JSON string to array for frontend
        const foodsWithParsedIngredients = foods.map(food => {
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

        res.json(foodsWithParsedIngredients);
    } catch (error) {
        console.error('Filter error:', error);
        res.status(500).json({error: 'Error fetching foods'});
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
    ingredients
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
        ingredients: JSON.stringify(ingredients)
      }
    });

    newRecipe.ingredients = JSON.parse(newRecipe.ingredients || '[]');
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

module.exports = router;