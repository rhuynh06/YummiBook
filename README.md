# 🍳 CookBook - Recipe Search Application

A beautiful recipe search and discovery application built with React, Mantine UI, Tailwind CSS, and Node.js.

## Features

- 🔍 **Advanced Recipe Filtering**: Filter by cuisine, ingredients, meal time, price, prep time, and dietary preferences
- 🎨 **Beautiful UI**: Modern design with Mantine components and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🗄️ **Database Integration**: SQLite database with Prisma ORM

## Tech Stack

### Frontend
- React 19 with TypeScript
- Mantine UI (v7) for components
- Tailwind CSS for styling
- Vite for build tooling
- Tabler Icons

### Backend
- Node.js with Express
- Prisma ORM
- SQLite database
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cook-book
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up the database**
   ```bash
   cd ../backend
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5050

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:5173

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Use the filter sidebar to search for recipes by:
   - Cuisine type (Italian, Mexican, etc.)
   - Ingredients (chicken, tomato, etc.)
   - Meal time (Breakfast, Lunch, Dinner, Snack)
   - Price range
   - Preparation time
   - Dietary preferences (Vegan, Vegetarian)
3. Click "Apply Filters" to see filtered results
4. Click "Clear Filters" to reset and see all recipes

## API Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/filter` - Filter recipes with query parameters

### Filter Parameters
- `cuisine` - Cuisine type
- `maxPrice` - Maximum price
- `mealTime` - Meal time (BREAKFAST, LUNCH, DINNER, SNACK)
- `isVegan` - Boolean for vegan recipes
- `isVegetarian` - Boolean for vegetarian recipes
- `ingredient` - Ingredient to search for
- `maxPrepTime` - Maximum preparation time in minutes

## Project Structure

```
cook-book/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── routes/
│   │   └── recipes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterForm.tsx
│   │   │   ├── RecipeCard.tsx
│   │   │   └── RecipeList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── recipe.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 