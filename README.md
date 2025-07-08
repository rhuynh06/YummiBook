# YummiBook - Recipe Management App

YummiBook is a full-stack web app that lets you browse, filter, add, edit, and view detailed recipes in a sleek and responsive UI.

## Features

- **Advanced Filtering** – Filter recipes by cuisine, meal time, ingredients, dietary preferences, price, and prep time  
- **Recipe Browsing** – View a grid of recipes with clear prep time, price, cuisine, and diet badges  
- **Add New Recipes** – Submit recipes with dropdowns, ingredients, and instructions  
- **Edit Recipes** – Update existing recipes with validation and live UI updates  
- **View Full Instructions** – Expand any recipe to see full details and steps  
- **Multi-Select Delete (Local Only)** – Select multiple recipes and bulk delete (only available in dev)  
- **Beautiful UI** – Built with Mantine + Tailwind CSS  
- **Fast Dev Environment** – Uses Vite for instant feedback  
- **Database Integration** – Prisma + SQLite for persistence  

---

## Tech Stack

### Frontend
- **React 19 + TypeScript**
- **Mantine UI v7**
- **Tailwind CSS**
- **Vite**
- **Tabler Icons**

### Backend
- **Node.js + Express**
- **Prisma ORM**
- **SQLite**
- **CORS Enabled**

---

## Run Locally (Recommended for Best Performance & Delete Function)

```bash
# Clone the repository
git clone https://github.com/rhuynh06/YummiBook.git
cd cookbook

# --- Backend Setup ---
cd backend
npm install
npx prisma migrate dev --name init
npm run dev  # Runs at http://localhost:5050

# --- Frontend Setup (in a new terminal) ---
cd ../frontend
npm install
npm run dev  # Runs at http://localhost:5173
