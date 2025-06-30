import { Card, Text, Badge, Group, Stack, Button } from '@mantine/core';
import { IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const getMealTimeColor = (mealTime: string) => {
    switch (mealTime) {
      case 'BREAKFAST': return 'yellow';
      case 'LUNCH': return 'orange';
      case 'DINNER': return 'red';
      case 'SNACK': return 'green';
      default: return 'blue';
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
      <Stack gap="md">
        <div>
          <Text fw={500} size="lg" className="mb-2">
            {recipe.name}
          </Text>
          <Text size="sm" c="dimmed" className="capitalize">
            {recipe.cuisine} Cuisine
          </Text>
        </div>

        <Group gap="xs">
          <Badge color={getMealTimeColor(recipe.mealTime)} variant="light">
            {recipe.mealTime}
          </Badge>
          {recipe.isVegan && (
            <Badge color="green" variant="light">
              Vegan
            </Badge>
          )}
          {recipe.isVegetarian && !recipe.isVegan && (
            <Badge color="teal" variant="light">
              Vegetarian
            </Badge>
          )}
        </Group>

        <Group gap="md">
          <Group gap="xs">
            <IconClock size={16} />
            <Text size="sm">{recipe.prepTime} min</Text>
          </Group>
          <Group gap="xs">
            <IconCurrencyDollar size={16} />
            <Text size="sm">${recipe.price.toFixed(2)}</Text>
          </Group>
        </Group>

        <div>
          <Text size="sm" fw={500} className="mb-2">
            Ingredients:
          </Text>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {recipe.ingredients.join(', ')}
          </Text>
        </div>

        <Button variant="light" fullWidth>
          View Recipe
        </Button>
      </Stack>
    </Card>
  );
} 