const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
  // Clear existing data first
  await prisma.food.deleteMany({})

  await prisma.food.createMany({
    data: [
      {
        name: "Anthony Tacos",
        price: 300.0,
        cuisine: "MEXICAN",
        prepTime: 600,
        mealTime: "LUNCH",
        isVegan: true,
        isVegetarian: true,
        ingredients: JSON.stringify(["avocado", "bread", "salt"]),
        instructions: "Mash the avocado and season with salt. Spread on bread and serve as tacos."
      },
      {
        name: "Marvin Gyro",
        price: 0.45,
        cuisine: "UNCIVILIZED",
        prepTime: 3,
        mealTime: "LUNCH",
        isVegan: false,
        isVegetarian: false,
        ingredients: JSON.stringify(["flatbread", "lettuce", "lamb", "fries", "sour cream"]),
        instructions: "Place lamb and fries on flatbread with lettuce and sour cream. Wrap and enjoy."
      },
      {
        name: "Ryan Bun Bo Hue",
        price: 15.45,
        cuisine: "VIETNAMESE",
        prepTime: 3600,
        mealTime: "LUNCH",
        isVegan: false,
        isVegetarian: false,
        ingredients: JSON.stringify([
          "beef bones",
          "lemongrass",
          "rice vermicelli noodles",
          "herbs",
          "vegetables",
          "lemon",
          "chili oil"
        ]),
        instructions: "Simmer beef bones with lemongrass for hours. Add noodles, herbs, vegetables, lemon, and chili oil to serve."
      }
    ]
  })

  console.log("Seed data inserted")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });