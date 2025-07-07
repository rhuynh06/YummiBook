-- CreateTable
CREATE TABLE "Food" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "cuisine" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "mealTime" TEXT NOT NULL,
    "isVegan" BOOLEAN NOT NULL,
    "isVegetarian" BOOLEAN NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
