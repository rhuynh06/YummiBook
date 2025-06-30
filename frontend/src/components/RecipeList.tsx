import { SimpleGrid, Text, Center, Loader } from '@mantine/core';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading?: boolean;
}

export function RecipeList({ recipes, isLoading = false }: RecipeListProps) {
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
          No recipes found. Try adjusting your filters.
        </Text>
      </Center>
    );
  }

  return (
    <SimpleGrid 
      cols={{ base: 1, sm: 2, md: 3, lg: 4 }} 
      spacing="lg"
      className="w-full"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </SimpleGrid>
  );
} 