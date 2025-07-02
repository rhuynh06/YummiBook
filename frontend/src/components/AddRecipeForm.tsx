import { useState } from 'react';
import {
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  Textarea,
  Button,
  Group,
  Stack,
  Card,
  Title,
} from '@mantine/core';
import { api } from '../services/api';

export function AddRecipeForm() {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    cuisine: '',
    prepTime: 0,
    mealTime: 'LUNCH',
    isVegan: false,
    isVegetarian: false,
    ingredients: '',
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addRecipe({
        ...form,
        mealTime: form.mealTime as 'LUNCH' | 'BREAKFAST' | 'DINNER' | 'SNACK',
        ingredients: form.ingredients.split(',').map(i => i.trim()),
      });
      alert('Recipe added!');
      setForm({
        name: '',
        price: 0,
        cuisine: '',
        prepTime: 0,
        mealTime: 'LUNCH',
        isVegan: false,
        isVegetarian: false,
        ingredients: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add recipe');
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={500} mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack gap="sm">
          <Title order={4}>Add New Recipe</Title>

          <TextInput
            label="Recipe Name"
            placeholder="e.g. Tofu Tacos"
            value={form.name}
            onChange={e => handleChange('name', e.currentTarget.value)}
            required
          />

          <Select
            label="Cuisine"
            placeholder="Select a cuisine"
            value={form.cuisine}
            onChange={val => handleChange('cuisine', val)}
            data={[
              { value: 'ITALIAN', label: 'Italian' },
              { value: 'MEXICAN', label: 'Mexican' },
              { value: 'VIETNAMESE', label: 'Vietnamese' },
              { value: 'CHINESE', label: 'Chinese' },
              { value: 'INDIAN', label: 'Indian' },
              { value: 'JAPANESE', label: 'Japanese' },
              { value: 'THAI', label: 'Thai' },
              { value: 'FRENCH', label: 'French' },
              { value: 'MEDITERRANEAN', label: 'Mediterranean' },
              { value: 'AMERICAN', label: 'American' },
            ]}
            searchable
            clearable
            required
          />

          <NumberInput
            label="Price ($)"
            value={form.price}
            onChange={val => handleChange('price', val ?? 0)}
            min={0}
            required
          />

          <NumberInput
            label="Prep Time (minutes)"
            value={form.prepTime}
            onChange={val => handleChange('prepTime', val ?? 0)}
            min={0}
            required
          />

          <Select
            label="Meal Time"
            value={form.mealTime}
            onChange={val => handleChange('mealTime', val)}
            data={['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']}
            required
          />

          <Group gap="md">
            <Checkbox
              label="Vegan"
              checked={form.isVegan}
              onChange={e => handleChange('isVegan', e.currentTarget.checked)}
            />
            <Checkbox
              label="Vegetarian"
              checked={form.isVegetarian}
              onChange={e => handleChange('isVegetarian', e.currentTarget.checked)}
            />
          </Group>

          <Textarea
            label="Ingredients (comma-separated)"
            placeholder="e.g. tofu, lettuce, tomato"
            value={form.ingredients}
            onChange={e => handleChange('ingredients', e.currentTarget.value)}
            autosize
            required
          />

          <Button type="submit" fullWidth>
            Add Recipe
          </Button>
        </Stack>
      </form>
    </Card>
  );
}