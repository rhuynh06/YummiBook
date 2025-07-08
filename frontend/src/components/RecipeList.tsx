import { SimpleGrid, Text, Center } from '@mantine/core';
import type { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';

type RecipeListProps = {
  recipes: Recipe[];
  isLoading: boolean;
  deleteMode?: boolean;
  onSelectDelete?: (recipe: Recipe) => void;
  selectedRecipeId?: number | null;
};

export function RecipeList({
  recipes,
  isLoading,
  deleteMode = false,
  onSelectDelete,
  selectedRecipeId,
}: RecipeListProps) {
  if (isLoading)
    return (
      <Center style={{ height: 200 }}>
        <Text>Loading...</Text>
      </Center>
    );

  if (recipes.length === 0)
    return (
      <Center style={{ height: 200 }}>
        <Text>No recipes found.</Text>
      </Center>
    );

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          deleteMode={deleteMode}
          isSelectedForDelete={recipe.id === selectedRecipeId}
          onSelectDelete={onSelectDelete ? () => onSelectDelete(recipe) : undefined}
        />
      ))}
    </SimpleGrid>
  );
}