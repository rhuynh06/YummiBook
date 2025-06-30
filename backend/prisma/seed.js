const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function main() {
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
        ingredients: JSON.stringify(["avocado", "bread", "salt"])
      },
      {
        name: "Marvin Gyro",
        price: 0.45,
        cuisine: "UNCIVILIZED",
        prepTime: 3,
        mealTime: "LUNCH",
        isVegan: false,
        isVegetarian: false,
        ingredients: JSON.stringify(["flatbread", "lettuce", "lamb", "fries", "sour cream"])
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
        ])
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
  })