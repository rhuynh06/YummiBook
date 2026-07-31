"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("../generated/prisma");
const seedGenerator_1 = require("./seedGenerator");
const prisma = new prisma_1.PrismaClient();
async function main() {
    try {
        // Clear existing data first (comment to keep)
        await prisma.food.deleteMany({});
        // Generate 50 unique recipes
        const recipes = (0, seedGenerator_1.generateUniqueRecipes)(50);
        // Insert generated recipes
        await prisma.food.createMany({
            data: recipes.map(recipe => ({
                ...recipe,
                ingredients: JSON.stringify(recipe.ingredients)
            })),
            skipDuplicates: true
        });
        console.log(`Successfully seeded ${recipes.length} recipes`);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
