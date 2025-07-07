// src/components/RecipeList.tsx
import React, { useEffect, useState } from 'react';
import { SimpleGrid, Text, Center, Loader } from '@mantine/core';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types/recipe';

export function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleEdit = async (updated: Recipe) => {
    try {
      const res = await fetch(`/api/recipes/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      const saved = await res.json();
      setRecipes((prev) =>
        prev.map((r) => (r.id === saved.id ? saved : r))
      );
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