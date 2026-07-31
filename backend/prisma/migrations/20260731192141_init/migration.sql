-- CreateEnum
CREATE TYPE "MealTime" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cuisine" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "mealTime" "MealTime" NOT NULL,
    "isVegan" BOOLEAN NOT NULL,
    "isVegetarian" BOOLEAN NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
