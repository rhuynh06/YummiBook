// backend code for sorting filter stuff

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function filterFoods(req, res) {
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
        const foods = await prisma.food.findMany({
            where: {
                ...(cuisine && {cuisine: {equals: cuisine, mode: 'insensitive'}}),
                ...(maxPrice && {price: {lte: parseFloat(maxPrice)}}),
                ...(mealTime && {mealTime: mealTime.toUpperCase()}),
                ...(isVegan !== undefined && {isVegan: isVegan === 'true'}),
                ...(isVegetarian !== undefined && {isVegetarian: isVegetarian === 'true'}),
                ...(ingredient && {ingredients: {has: ingredient}}),
                ...(maxPrepTime && {prepTime: {lte: parseInt(maxPrepTime)}})
            }
        })

        res.json(foods)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Error fetching foods'})
    }
}