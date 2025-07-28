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
      },
      {
        name: 'Tender Chickpea Pizza',
        price: 7.93,
        cuisine: 'SCANDINAVIAN',
        prepTime: 2842,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["potato","rye bread","fish"]',
        instructions: 'Mix potato, rye bread, fish thoroughly and serve.'
      },
      {
        name: 'Grilled Turkey Sandwich',
        price: 15.7,
        cuisine: 'THAI',
        prepTime: 781,
        mealTime: 'DINNER',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["lime","coconut milk","chili"]',
        instructions: 'Layer lime, coconut milk, chili and garnish before serving.'
      },
      {
        name: 'Fresh Mushroom Burger',
        price: 12.25,
        cuisine: 'KOREAN',
        prepTime: 585,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["sesame oil","garlic","beef","soy sauce","rice","kimchi"]',
        instructions: 'Combine sesame oil, garlic, beef, soy sauce, rice, kimchi and cook until done.'
      },
      {
        name: 'Zesty Eggplant',
        price: 24.47,
        cuisine: 'SICILIAN',
        prepTime: 1207,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["anchovy","capers","pasta","tomato","olive oil"]',
        instructions: 'Combine anchovy, capers, pasta, tomato, olive oil and cook until done.'
      },
      {
        name: 'Roasted Veggie Pizza',
        price: 14.89,
        cuisine: 'CARIBBEAN',
        prepTime: 2796,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["beans","rice","thyme"]',
        instructions: 'Combine beans, rice, thyme and cook until done.'
      },
      {
        name: 'Creamy Lentil',
        price: 10.12,
        cuisine: 'ETHIOPIAN',
        prepTime: 576,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["spices","chickpeas","injera","lentils","berbere"]',
        instructions: 'Layer spices, chickpeas, injera, lentils, berbere and garnish before serving.'
      },
      {
        name: 'Bold Salmon Sandwich',
        price: 4.49,
        cuisine: 'MOROCCAN',
        prepTime: 1362,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["apricot","lamb","cinnamon","chickpeas"]',
        instructions: 'Combine apricot, lamb, cinnamon, chickpeas and cook until done.'
      },
      {
        name: 'Bold Lamb',
        price: 29.23,
        cuisine: 'CARIBBEAN',
        prepTime: 1625,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["chicken","rice","beans","thyme","scotch bonnet","allspice"]',
        instructions: 'Mix chicken, rice, beans, thyme, scotch bonnet, allspice thoroughly and serve.'
      },
      {
        name: 'Smoky Mushroom Frittata',
        price: 5.34,
        cuisine: 'FILIPINO',
        prepTime: 2390,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["garlic","pork","rice"]',
        instructions: 'Combine garlic, pork, rice and cook until done.'
      },
      {
        name: 'Savory Beef',
        price: 23.86,
        cuisine: 'FRENCH',
        prepTime: 3031,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["thyme","baguette","cream","butter","cheese","wine"]',
        instructions: 'Prepare thyme, baguette, cream, butter, cheese, wine, then bake or fry as preferred.'
      },
      {
        name: 'Grilled Veggie Salad',
        price: 22.62,
        cuisine: 'RUSSIAN',
        prepTime: 2029,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["potato","onion","sour cream","cabbage","beef"]',
        instructions: 'Prepare potato, onion, sour cream, cabbage, beef, then bake or fry as preferred.'
      },
      {
        name: 'Sizzling Chicken Bowl',
        price: 6.24,
        cuisine: 'FILIPINO',
        prepTime: 2950,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["garlic","rice","soy sauce"]',
        instructions: 'Prepare garlic, rice, soy sauce, then bake or fry as preferred.'
      },
      {
        name: 'Crunchy Tofu Pizza',
        price: 9.08,
        cuisine: 'TURKISH',
        prepTime: 1532,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["eggplant","yogurt","tomato"]',
        instructions: 'Prepare eggplant, yogurt, tomato, then bake or fry as preferred.'
      },
      {
        name: 'Sizzling Chickpea Soup',
        price: 5.62,
        cuisine: 'CARIBBEAN',
        prepTime: 3527,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["allspice","chicken","rice"]',
        instructions: 'Combine allspice, chicken, rice and cook until done.'
      },
      {
        name: 'Glazed Eggplant Soup',
        price: 8.66,
        cuisine: 'RUSSIAN',
        prepTime: 2297,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["potato","beef","onion","sour cream","cabbage"]',
        instructions: 'Prepare potato, beef, onion, sour cream, cabbage, then bake or fry as preferred.'
      },
      {
        name: 'Grilled Salmon Burger',
        price: 5.83,
        cuisine: 'FRENCH',
        prepTime: 985,
        mealTime: 'SNACK',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["thyme","baguette","cream"]',
        instructions: 'Mix thyme, baguette, cream thoroughly and serve.'
      },
      {
        name: 'Roasted Pork',
        price: 23.49,
        cuisine: 'TURKISH',
        prepTime: 1442,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["eggplant","yogurt","tomato","garlic"]',
        instructions: 'Layer eggplant, yogurt, tomato, garlic and garnish before serving.'
      },
      {
        name: 'Grilled Lamb Salad',
        price: 15.05,
        cuisine: 'ETHIOPIAN',
        prepTime: 476,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["lentils","berbere","injera","chickpeas"]',
        instructions: 'Mix lentils, berbere, injera, chickpeas thoroughly and serve.'
      },
      {
        name: 'Grilled Lamb Tacos',
        price: 22.31,
        cuisine: 'GERMAN',
        prepTime: 3584,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["pork","potato","cabbage","sauerkraut"]',
        instructions: 'Prepare pork, potato, cabbage, sauerkraut, then bake or fry as preferred.'
      },
      {
        name: 'Smoky Beef Rolls',
        price: 9.53,
        cuisine: 'ARGENTINIAN',
        prepTime: 3126,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["corn","chimichurri","potato"]',
        instructions: 'Layer corn, chimichurri, potato and garnish before serving.'
      },
      {
        name: 'Sweet Veggie Burger',
        price: 12.96,
        cuisine: 'CUBAN',
        prepTime: 2974,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["pork","lime","garlic"]',
        instructions: 'Layer pork, lime, garlic and garnish before serving.'
      },
      {
        name: 'Hearty Chickpea Rolls',
        price: 35.33,
        cuisine: 'MEXICAN-AMERICAN',
        prepTime: 2736,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["tomato","lettuce","sour cream","beef","cheese","tortilla"]',
        instructions: 'Simmer tomato, lettuce, sour cream, beef, cheese, tortilla with spices and herbs for flavor.'
      },
      {
        name: 'Fresh Salmon Burger',
        price: 12.59,
        cuisine: 'ITALIAN',
        prepTime: 3571,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["mozzarella","basil","tomato sauce","pasta"]',
        instructions: 'Mix mozzarella, basil, tomato sauce, pasta thoroughly and serve.'
      },
      {
        name: 'Sizzling Eggplant Frittata',
        price: 16.27,
        cuisine: 'FRENCH',
        prepTime: 1169,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["thyme","butter","wine","cream","cheese","baguette"]',
        instructions: 'Combine thyme, butter, wine, cream, cheese, baguette and cook until done.'
      },
      {
        name: 'Juicy Lamb Soup',
        price: 35.87,
        cuisine: 'MEXICAN',
        prepTime: 2946,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["tomato","avocado","corn","cheese","jalapeno","tortilla"]',
        instructions: 'Layer tomato, avocado, corn, cheese, jalapeno, tortilla and garnish before serving.'
      },
      {
        name: 'Roasted Sausage Platter',
        price: 29.39,
        cuisine: 'ARGENTINIAN',
        prepTime: 1332,
        mealTime: 'BREAKFAST',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["corn","chimichurri","onion","potato","beef"]',
        instructions: 'Layer corn, chimichurri, onion, potato, beef and garnish before serving.'
      },
      {
        name: 'Sweet Sausage Wrap',
        price: 5.11,
        cuisine: 'RUSSIAN',
        prepTime: 2369,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["cabbage","potato","onion","beef"]',
        instructions: 'Prepare cabbage, potato, onion, beef, then bake or fry as preferred.'
      },
      {
        name: 'Tangy Eggplant',
        price: 18.41,
        cuisine: 'ITALIAN',
        prepTime: 2736,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["parmesan","tomato sauce","pasta","basil"]',
        instructions: 'Prepare parmesan, tomato sauce, pasta, basil, then bake or fry as preferred.'
      },
      {
        name: 'Smoky Bacon',
        price: 7.03,
        cuisine: 'ETHIOPIAN',
        prepTime: 2459,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["lentils","injera","berbere","chickpeas","spices"]',
        instructions: 'Layer lentils, injera, berbere, chickpeas, spices and garnish before serving.'
      },
      {
        name: 'Sizzling Salmon Rolls',
        price: 13.52,
        cuisine: 'VIETNAMESE',
        prepTime: 658,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["fish sauce","rice noodles","beef","lemongrass","herbs","chili oil"]',
        instructions: 'Layer fish sauce, rice noodles, beef, lemongrass, herbs, chili oil and garnish before serving.'
      },
      {
        name: 'Grilled Chicken Platter',
        price: 15.61,
        cuisine: 'MEXICAN',
        prepTime: 1028,
        mealTime: 'SNACK',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["avocado","corn","cheese","tomato","tortilla","jalapeno"]',
        instructions: 'Simmer avocado, corn, cheese, tomato, tortilla, jalapeno with spices and herbs for flavor.'
      },
      {
        name: 'Hearty Pork',
        price: 11.54,
        cuisine: 'SOUTH AFRICAN',
        prepTime: 1506,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["tomato","onion","maize","beef","spices"]',
        instructions: 'Combine tomato, onion, maize, beef, spices and cook until done.'
      },
      {
        name: 'Sweet Pork',
        price: 7.39,
        cuisine: 'RUSSIAN',
        prepTime: 1041,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["cabbage","potato","sour cream"]',
        instructions: 'Prepare cabbage, potato, sour cream, then bake or fry as preferred.'
      },
      {
        name: 'Spicy Chicken Burger',
        price: 32.67,
        cuisine: 'FRENCH',
        prepTime: 2371,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["cream","cheese","wine","butter","thyme","baguette"]',
        instructions: 'Layer cream, cheese, wine, butter, thyme, baguette and garnish before serving.'
      },
      {
        name: 'Tender Quinoa',
        price: 12.12,
        cuisine: 'BRAZILIAN',
        prepTime: 3351,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["cassava","garlic","onion"]',
        instructions: 'Simmer cassava, garlic, onion with spices and herbs for flavor.'
      },
      {
        name: 'Savory Chicken Burger',
        price: 17.64,
        cuisine: 'SPANISH',
        prepTime: 583,
        mealTime: 'BREAKFAST',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["chorizo","saffron","tomato","rice","seafood"]',
        instructions: 'Prepare chorizo, saffron, tomato, rice, seafood, then bake or fry as preferred.'
      },
      {
        name: 'Juicy Veggie Wrap',
        price: 13.97,
        cuisine: 'INDIAN',
        prepTime: 3529,
        mealTime: 'DINNER',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["lentils","yogurt","cumin","curry powder"]',
        instructions: 'Prepare lentils, yogurt, cumin, curry powder, then bake or fry as preferred.'
      },
      {
        name: 'Tangy Tofu',
        price: 13.18,
        cuisine: 'PUERTO RICAN',
        prepTime: 343,
        mealTime: 'BREAKFAST',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["rice","plantain","beans"]',
        instructions: 'Simmer rice, plantain, beans with spices and herbs for flavor.'
      },
      {
        name: 'Tender Shrimp',
        price: 15.53,
        cuisine: 'PERUVIAN',
        prepTime: 2822,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["chili","corn","lime","fish"]',
        instructions: 'Layer chili, corn, lime, fish and garnish before serving.'
      },
      {
        name: 'Roasted Beef',
        price: 14.91,
        cuisine: 'SPANISH',
        prepTime: 666,
        mealTime: 'SNACK',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["saffron","rice","chorizo"]',
        instructions: 'Prepare saffron, rice, chorizo, then bake or fry as preferred.'
      },
      {
        name: 'Sizzling Chickpea Bowl',
        price: 10.43,
        cuisine: 'POLISH',
        prepTime: 441,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["potato","onion","cabbage","sausage","sour cream"]',
        instructions: 'Layer potato, onion, cabbage, sausage, sour cream and garnish before serving.'
      },
      {
        name: 'Sizzling Lamb',
        price: 13.33,
        cuisine: 'JAPANESE',
        prepTime: 3175,
        mealTime: 'LUNCH',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["ginger","seaweed","fish","soy sauce","rice","wasabi"]',
        instructions: 'Simmer ginger, seaweed, fish, soy sauce, rice, wasabi with spices and herbs for flavor.'
      },
      {
        name: 'Roasted Lamb',
        price: 17.93,
        cuisine: 'FRENCH',
        prepTime: 1456,
        mealTime: 'BREAKFAST',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["cream","cheese","wine","butter","thyme"]',
        instructions: 'Mix cream, cheese, wine, butter, thyme thoroughly and serve.'
      },
      {
        name: 'Smoky Lentil',
        price: 23.79,
        cuisine: 'CARIBBEAN',
        prepTime: 3252,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["rice","beans","chicken","scotch bonnet"]',
        instructions: 'Layer rice, beans, chicken, scotch bonnet and garnish before serving.'
      },
      {
        name: 'Crunchy Salmon Platter',
        price: 16.52,
        cuisine: 'JAPANESE',
        prepTime: 2377,
        mealTime: 'SNACK',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["rice","ginger","wasabi"]',
        instructions: 'Mix rice, ginger, wasabi thoroughly and serve.'
      },
      {
        name: 'Juicy Bacon Platter',
        price: 15.77,
        cuisine: 'TURKISH',
        prepTime: 2387,
        mealTime: 'SNACK',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["garlic","yogurt","eggplant","lamb","tomato"]',
        instructions: 'Simmer garlic, yogurt, eggplant, lamb, tomato with spices and herbs for flavor.'
      },
      {
        name: 'Savory Lentil Pizza',
        price: 7.42,
        cuisine: 'VIETNAMESE',
        prepTime: 1601,
        mealTime: 'DINNER',
        isVegan: true,
        isVegetarian: true,
        ingredients: '["lemongrass","beef","rice noodles","fish sauce","chili oil"]',
        instructions: 'Mix lemongrass, beef, rice noodles, fish sauce, chili oil thoroughly and serve.'
      },
      {
        name: 'Fresh Chicken Skewers',
        price: 8.27,
        cuisine: 'FILIPINO',
        prepTime: 2140,
        mealTime: 'SNACK',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["pork","rice","onion"]',
        instructions: 'Simmer pork, rice, onion with spices and herbs for flavor.'
      },
      {
        name: 'Crunchy Chicken',
        price: 9.3,
        cuisine: 'KOREAN',
        prepTime: 2704,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: false,
        ingredients: '["garlic","rice","kimchi"]',
        instructions: 'Prepare garlic, rice, kimchi, then bake or fry as preferred.'
      },
      {
        name: 'Juicy Veggie Bowl',
        price: 15.3,
        cuisine: 'CARIBBEAN',
        prepTime: 3183,
        mealTime: 'BREAKFAST',
        isVegan: false,
        isVegetarian: true,
        ingredients: '["scotch bonnet","thyme","allspice"]',
        instructions: 'Mix scotch bonnet, thyme, allspice thoroughly and serve.'
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