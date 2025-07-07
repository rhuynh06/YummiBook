// src/components/RecipeCard.tsx
import React, { useState } from 'react';
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Modal,
  TextInput,
  Textarea,
  Checkbox,
} from '@mantine/core';
import { IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit?: (updatedRecipe: Recipe) => void;
}

export function RecipeCard({ recipe, onEdit }: RecipeCardProps) {
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [fullRecipe, setFullRecipe] = useState<Recipe>(recipe);
  const [form, setForm] = useState<Recipe>(recipe);

  const getMealTimeColor = (mealTime: string) => {
    switch (mealTime) {
      case 'BREAKFAST': return 'yellow';
      case 'LUNCH': return 'orange';
      case 'DINNER': return 'red';
      case 'SNACK': return 'green';
      default: return 'blue';
    }
  };

  const handleView = async () => {
    try {
      const res = await fetch(`/api/recipes/${recipe.id}`);
      const data = await res.json();
      setFullRecipe({
        ...data,
        ingredients: data.ingredients || [],
        instructions: data.instructions || '',
      });
      setViewOpened(true);
    } catch (err) {
      console.error('Error fetching recipe details', err);
    }
  };

  const handleChange = (field: keyof Recipe, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    onEdit?.(form);
    setEditOpened(false);
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{margin:"10px", maxWidth:"100%"}}>
        <Stack gap="md">
          <div>
            <Text fw={500} size="lg">{recipe.name}</Text>
            <Text size="sm" c="dimmed">{recipe.cuisine}</Text>
          </div>

          <Group gap="xs">
            <Badge color={getMealTimeColor(recipe.mealTime)}>{recipe.mealTime}</Badge>
            {recipe.isVegan && <Badge color="green">Vegan</Badge>}
            {recipe.isVegetarian && !recipe.isVegan && <Badge color="teal">Vegetarian</Badge>}
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
            <Text size="sm" fw={500}>Ingredients:</Text>
            <Text size="sm" c="dimmed" lineClamp={3}>{recipe.ingredients.join(', ')}</Text>
          </div>

          <Group grow>
            <Button onClick={handleView} variant="light">Recipe</Button>
            <Button onClick={() => { setForm(recipe); setEditOpened(true); }} variant="outline">Edit</Button>
          </Group>
        </Stack>
      </Card>

      {/* View Modal */}
      <Modal opened={viewOpened} onClose={() => setViewOpened(false)} title={fullRecipe.name} size="lg">
        <Stack>
          <Text><strong>Cuisine:</strong> {fullRecipe.cuisine}</Text>
          <Text><strong>Meal Time:</strong> {fullRecipe.mealTime}</Text>
          <Text><strong>Preparation Time:</strong> {fullRecipe.prepTime} min</Text>
          <Text><strong>Price:</strong> ${fullRecipe.price.toFixed(2)}</Text>
          <Text><strong>Ingredients:</strong></Text>
          <ul>
            {fullRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
          {fullRecipe.instructions && (
            <>
              <Text fw={500}>Instructions:</Text>
              <Text>{fullRecipe.instructions}</Text>
            </>
          )}
        </Stack>
      </Modal>

      {/* Edit Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title={`Edit: ${form.name}`} size="lg">
        <Stack>
          <TextInput label="Name" value={form.name} onChange={(e) => handleChange('name', e.currentTarget.value)} />
          <TextInput label="Cuisine" value={form.cuisine} onChange={(e) => handleChange('cuisine', e.currentTarget.value)} />
          <TextInput label="Meal Time" value={form.mealTime} onChange={(e) => handleChange('mealTime', e.currentTarget.value.toUpperCase())} />
          <TextInput label="Prep Time" type="number" value={form.prepTime} onChange={(e) => handleChange('prepTime', Number(e.currentTarget.value))} />
          <TextInput label="Price" type="number" value={form.price} onChange={(e) => handleChange('price', Number(e.currentTarget.value))} />
          <Textarea
            label="Ingredients (comma separated)"
            value={form.ingredients.join(', ')}
            onChange={(e) => handleChange('ingredients', e.currentTarget.value.split(',').map(s => s.trim()))}
          />
          <Textarea
            label="Instructions"
            value={form.instructions || ''}
            onChange={(e) => handleChange('instructions', e.currentTarget.value)}
          />
          <Checkbox label="Vegan" checked={form.isVegan} onChange={(e) => handleChange('isVegan', e.currentTarget.checked)} />
          <Checkbox label="Vegetarian" checked={form.isVegetarian} onChange={(e) => handleChange('isVegetarian', e.currentTarget.checked)} />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setEditOpened(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}