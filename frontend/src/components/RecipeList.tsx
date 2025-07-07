// src/components/RecipeList.tsx
import { SimpleGrid, Text, Center, Loader } from '@mantine/core';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
}

export function RecipeList({ recipes, isLoading }: RecipeListProps) {
  const handleEdit = async (updated: Recipe) => {
    try {
      const res = await fetch(`/api/recipes/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      window.location.reload();
    } catch (err) {
      console.error('Failed to update recipe', err);
    }
  };

  if (isLoading) {
    return (
      <Center className="py-12">
        <Loader size="lg" />
      </Center>
    );
  }

  if (recipes.length === 0) {
    return (
      <Center className="py-12">
        <Text size="lg" c="dimmed">
          No recipes found.
        </Text>
      </Center>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onEdit={handleEdit} />
      ))}
    </SimpleGrid>
  );
}