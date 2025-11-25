import { PrismaClient } from '../generated/prisma';
import { generateUniqueRecipes } from './seedGenerator';

const prisma = new PrismaClient();

interface SeedRecipe {
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

async function main(): Promise<void> {
  try {
    // Clear existing data first (comment to keep)
    await prisma.food.deleteMany({});

    // Generate 50 unique recipes
    const recipes: SeedRecipe[] = generateUniqueRecipes(50);

    // Insert generated recipes
    await prisma.food.createMany({
      data: recipes.map(recipe => ({
        ...recipe,
        ingredients: JSON.stringify(recipe.ingredients)
      })),
      skipDuplicates: true
    });

    console.log(`Successfully seeded ${recipes.length} recipes`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });