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
        ingredient,
        maxPrepTime
    } = req.query

    try {
        let foods = await prisma.food.findMany({
            where: {
                ...(cuisine && {cuisine: {equals: cuisine, mode: 'insensitive'}}),
                ...(maxPrice && {price: {lte: parseFloat(maxPrice)}}),
                ...(mealTime && {mealTime: mealTime.toUpperCase()}),
                ...(isVegan !== undefined && {isVegan: isVegan === 'true'}),
                ...(isVegetarian !== undefined && {isVegetarian: isVegetarian === 'true'}),
                ...(maxPrepTime && {prepTime: {lte: parseInt(maxPrepTime)}})
            }
        });

        // Filter by ingredient if provided (since we can't use array operations in SQLite)
        if (ingredient) {
            foods = foods.filter(food => {
                try {
                    const ingredients = JSON.parse(food.ingredients || '[]');
                    return ingredients.some(ing => 
                        ing.toLowerCase().includes(ingredient.toLowerCase())
                    );
                } catch (e) {
                    return false;
                }
            });
        }

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

module.exports = router;