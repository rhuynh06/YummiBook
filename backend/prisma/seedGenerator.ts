interface Recipe {
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

type CuisineType = string;

function generateUniqueRecipes(N: number): Recipe[] {
  const cuisines: CuisineType[] = [
    "AMERICAN", "ARGENTINIAN", "AUSTRALIAN", "BRAZILIAN", "BRITISH", "CAJUN", "CARIBBEAN",
    "CHINESE", "CREOLE", "CUBAN", "ETHIOPIAN", "FILIPINO", "FRENCH", "GERMAN", "GREEK",
    "INDIAN", "INDONESIAN", "ITALIAN", "JAMAICAN", "JAPANESE", "KOREAN", "LEBANESE",
    "MALAYSIAN", "MEDITERRANEAN", "MEXICAN", "MEXICAN-AMERICAN", "MOROCCAN", "PERUVIAN",
    "POLISH", "PUERTO RICAN", "RUSSIAN", "SCANDINAVIAN", "SICILIAN", "SOUTH AFRICAN",
    "SPANISH", "THAI", "TURKISH", "VIETNAMESE"
  ];

  const mealTimes: Array<'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'> = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
  const veganOptions: boolean[] = [true, false];
  const vegetarianOptions: boolean[] = [true, false];

  const adjectives: string[] = [
    "Sizzling", "Crunchy", "Spicy", "Savory", "Sweet", "Zesty", "Tangy", "Smoky", "Creamy",
    "Crispy", "Roasted", "Grilled", "Glazed", "Fresh", "Hearty", "Juicy", "Tender", "Bold"
  ];

  const mainIngredients: string[] = [
    "Chicken", "Beef", "Tofu", "Salmon", "Pork", "Veggie", "Shrimp", "Lamb", "Mushroom",
    "Quinoa", "Lentil", "Eggplant", "Turkey", "Cheese", "Bacon", "Sausage", "Chickpea"
  ];

  const dishTypes: string[] = [
    "Wrap", "Bowl", "Salad", "Platter", "Skewers", "Tacos", "Stir-fry", "Curry", "Sandwich",
    "Pasta", "Stew", "Burger", "Pizza", "Soup", "Rolls", "Frittata"
  ];

  const instructionsTemplates: Array<(ingredients: string[]) => string> = [
    (ingredients) => `Combine ${ingredients.join(", ")} and cook until done.`,
    (ingredients) => `Mix ${ingredients.join(", ")} thoroughly and serve.`,
    (ingredients) => `Prepare ${ingredients.join(", ")}, then bake or fry as preferred.`,
    (ingredients) => `Layer ${ingredients.join(", ")} and garnish before serving.`,
    (ingredients) => `Simmer ${ingredients.join(", ")} with spices and herbs for flavor.`
  ];

  const ingredientsByCuisine: Record<CuisineType, string[]> = {
    AMERICAN: ["beef", "bread", "lettuce", "cheese", "tomato", "mustard", "pickle"],
    ARGENTINIAN: ["beef", "chimichurri", "corn", "potato", "onion", "garlic"],
    AUSTRALIAN: ["lamb", "potato", "mint", "carrot", "peas", "butter"],
    BRAZILIAN: ["black beans", "rice", "pork", "onion", "garlic", "cassava"],
    BRITISH: ["potato", "beef", "carrot", "peas", "onion", "mushroom"],
    CAJUN: ["sausage", "shrimp", "rice", "celery", "onion", "bell pepper"],
    CARIBBEAN: ["chicken", "rice", "beans", "allspice", "scotch bonnet", "thyme"],
    CHINESE: ["soy sauce", "ginger", "garlic", "scallions", "noodles", "tofu"],
    CREOLE: ["shrimp", "rice", "tomato", "bell pepper", "onion", "celery"],
    CUBAN: ["pork", "black beans", "rice", "lime", "garlic", "onion"],
    ETHIOPIAN: ["lentils", "injera", "spices", "chickpeas", "berbere"],
    FILIPINO: ["pork", "vinegar", "soy sauce", "garlic", "onion", "rice"],
    FRENCH: ["butter", "cream", "thyme", "baguette", "cheese", "wine"],
    GERMAN: ["pork", "potato", "sauerkraut", "mustard", "cabbage"],
    GREEK: ["feta", "olive oil", "olives", "cucumber", "tomato", "oregano"],
    INDIAN: ["curry powder", "lentils", "rice", "cumin", "turmeric", "chili", "yogurt"],
    INDONESIAN: ["rice", "chili", "peanut", "coconut", "tofu", "garlic"],
    ITALIAN: ["pasta", "tomato sauce", "basil", "mozzarella", "olive oil", "garlic", "parmesan"],
    JAMAICAN: ["jerk chicken", "rice", "peas", "allspice", "scotch bonnet"],
    JAPANESE: ["rice", "soy sauce", "seaweed", "wasabi", "ginger", "fish"],
    KOREAN: ["kimchi", "rice", "beef", "soy sauce", "garlic", "sesame oil"],
    LEBANESE: ["chicken", "tahini", "chickpeas", "garlic", "lemon"],
    MALAYSIAN: ["coconut milk", "chili", "rice", "lemongrass", "tofu"],
    MEDITERRANEAN: ["olive oil", "tomato", "cucumber", "feta", "lemon", "oregano"],
    MEXICAN: ["avocado", "tortilla", "beans", "corn", "jalapeno", "cheese", "tomato"],
    "MEXICAN-AMERICAN": ["tortilla", "cheese", "beef", "sour cream", "lettuce", "tomato"],
    MOROCCAN: ["couscous", "chickpeas", "cinnamon", "lamb", "apricot"],
    PERUVIAN: ["potato", "corn", "chili", "lime", "fish"],
    POLISH: ["potato", "cabbage", "sausage", "onion", "sour cream"],
    "PUERTO RICAN": ["pork", "rice", "beans", "plantain", "garlic"],
    RUSSIAN: ["beef", "cabbage", "sour cream", "onion", "potato"],
    SCANDINAVIAN: ["fish", "potato", "dill", "rye bread"],
    SICILIAN: ["pasta", "tomato", "olive oil", "capers", "anchovy"],
    "SOUTH AFRICAN": ["beef", "maize", "tomato", "onion", "spices"],
    SPANISH: ["rice", "seafood", "saffron", "chorizo", "tomato"],
    THAI: ["coconut milk", "lime", "chili", "basil", "fish sauce", "peanuts"],
    TURKISH: ["lamb", "yogurt", "eggplant", "tomato", "garlic"],
    VIETNAMESE: ["rice noodles", "lemongrass", "herbs", "chili oil", "beef", "fish sauce"]
  };

  const usedNames: Set<string> = new Set();
  const recipes: Recipe[] = [];

  function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateName(): string {
    const adj = getRandom(adjectives);
    const main = getRandom(mainIngredients);
    const useDishType = Math.random() < 0.7;
    const dish = useDishType ? getRandom(dishTypes) : null;

    return dish ? `${adj} ${main} ${dish}` : `${adj} ${main}`;
  }

  while (recipes.length < N) {
    const cuisine = getRandom(cuisines);
    const mealTime = getRandom(mealTimes);
    const isVegan = getRandom(veganOptions);
    const isVegetarian = isVegan ? true : getRandom(vegetarianOptions);

    const name = generateName();

    if (usedNames.has(name)) {
      continue;
    }
    usedNames.add(name);

    const cuisineIngredients = ingredientsByCuisine[cuisine] || ["salt", "water", "oil"];

    const ingredientCount = 3 + Math.floor(Math.random() * 4);
    const shuffledIngredients = cuisineIngredients.sort(() => 0.5 - Math.random());
    const ingredients = shuffledIngredients.slice(0, ingredientCount);

    const price = Number((ingredients.length * (1 + Math.random() * 5)).toFixed(2));
    const prepTime = 300 + Math.floor(Math.random() * 3300);
    const instructions = getRandom(instructionsTemplates)(ingredients);

    recipes.push({
      name,
      price,
      cuisine,
      prepTime,
      mealTime,
      isVegan,
      isVegetarian,
      ingredients,
      instructions
    });
  }

  return recipes;
}

export { generateUniqueRecipes };