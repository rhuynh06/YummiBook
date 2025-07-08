import { SimpleGrid } from '@mantine/core';
import type { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';

type RecipeListProps = {
  recipes: Recipe[];
  isLoading: boolean;
  deleteMode?: boolean;
  onSelectDelete?: (recipeId: number) => void;
  selectedRecipeIds?: number[];
};

export function RecipeList({
  recipes,
  isLoading,
  deleteMode = false,
  onSelectDelete,
  selectedRecipeIds = [],
}: RecipeListProps) {
  if (isLoading) return <div>Loading...</div>;
  if (recipes.length === 0) return <div>No recipes found.</div>;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          deleteMode={deleteMode}
          isSelectedForDelete={selectedRecipeIds.includes(recipe.id)}
          onSelectDelete={() => onSelectDelete && onSelectDelete(recipe.id)}
        />
      ))}
    </SimpleGrid>
  );
}
