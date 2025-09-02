import { useState } from 'react';
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
  Select,
} from '@mantine/core';
import { IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import type { Recipe } from '../types/recipe';
import { api } from '../services/api';
import { cuisineOptions } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit?: (updatedRecipe: Recipe) => void;
  deleteMode?: boolean;
  isSelectedForDelete?: boolean;
  onSelectDelete?: () => void;
}

export function RecipeCard({
  recipe,
  onEdit,
  deleteMode = false,
  isSelectedForDelete = false,
  onSelectDelete,
}: RecipeCardProps) {
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

  const handleChange = (field: keyof Recipe, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await api.updateRecipe(form.id, {
        ...form,
        ingredients: form.ingredients,
      });
      setForm(updated);
      setFullRecipe(updated);
      setEditOpened(false);
      onEdit?.(updated);
    } catch (err) {
      console.error('Failed to update recipe', err);
      alert('Failed to update recipe. Please try again.');
    }
  };

  const handleCardClick = () => {
    if (deleteMode && onSelectDelete) {
      onSelectDelete();
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          margin: '10px',
          maxWidth: '100%',
          border: isSelectedForDelete ? '3px solid red' : undefined,
          cursor: deleteMode ? 'pointer' : 'default',
        }}
        onClick={handleCardClick}
      >
        <Stack gap="md">
          <div>
            <Text fw={500} size="lg">{fullRecipe.name}</Text>
            <Text size="sm" c="dimmed">{fullRecipe.cuisine}</Text>
          </div>

          <Group gap="xs">
            <Badge color={getMealTimeColor(fullRecipe.mealTime)}>{fullRecipe.mealTime}</Badge>
            {fullRecipe.isVegan && <Badge color="green">Vegan</Badge>}
            {fullRecipe.isVegetarian && <Badge color="teal">Vegetarian</Badge>}
          </Group>

          <Group gap="md">
            <Group gap="xs">
              <IconClock size={16} />
              <Text size="sm">{fullRecipe.prepTime} min</Text>
            </Group>
            <Group gap="xs">
              <IconCurrencyDollar size={16} />
              <Text size="sm">${fullRecipe.price.toFixed(2)}</Text>
            </Group>
          </Group>

          <div>
            <Text size="sm" fw={500}>Ingredients:</Text>
            <Text size="sm" c="dimmed" lineClamp={3}>{fullRecipe.ingredients.join(', ')}</Text>
          </div>

          {!deleteMode && (
            <Group grow>
              <Button onClick={() => setViewOpened(true)} variant="light">Recipe</Button>
              <Button onClick={() => setEditOpened(true)} variant="outline">Edit</Button>
            </Group>
          )}
        </Stack>
      </Card>

      {/* View Modal */}
<Modal
  opened={viewOpened}
  onClose={() => setViewOpened(false)}
  title={fullRecipe.name}
  size="lg"
  centered
>
  <Stack spacing="md">
    <Text>
      <Text component="span" color="blue" fw={600}>Cuisine:</Text> {fullRecipe.cuisine}
    </Text>
    <Text>
      <Text component="span" color="blue" fw={600}>Meal Time:</Text> {fullRecipe.mealTime}
    </Text>
    <Text>
      <Text component="span" color="blue" fw={600}>Preparation Time:</Text> {fullRecipe.prepTime} min
    </Text>
    <Text>
      <Text component="span" color="blue" fw={600}>Price:</Text> ${fullRecipe.price.toFixed(2)}
    </Text>

    <div>
      <Text color="blue" fw={600} mb={4}>Ingredients:</Text>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
        {fullRecipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </div>

    {fullRecipe.instructions && (
      <div>
        <Text color="blue" fw={600} mb={4}>Instructions:</Text>
        <Text style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {fullRecipe.instructions}
        </Text>
      </div>
    )}
  </Stack>
</Modal>


      {/* Edit Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title={`Edit: ${form.name}`} size="lg" centered>
        <Stack>
          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.currentTarget.value)}
            required
          />
          <Select
            label="Cuisine"
            placeholder="Select cuisine"
            value={form.cuisine}
            onChange={(val) => handleChange('cuisine', val)}
            data={cuisineOptions}
            searchable
            clearable
            required
          />
          <Select
            label="Meal Time"
            value={form.mealTime}
            onChange={(val) => handleChange('mealTime', val)}
            data={[
              { value: 'BREAKFAST', label: 'Breakfast' },
              { value: 'LUNCH', label: 'Lunch' },
              { value: 'DINNER', label: 'Dinner' },
              { value: 'SNACK', label: 'Snack' },
            ]}
            required
          />
          <TextInput
            label="Prep Time (minutes)"
            type="number"
            value={form.prepTime}
            onChange={(e) => handleChange('prepTime', Number(e.currentTarget.value))}
            required
          />
          <TextInput
            label="Price ($)"
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', Number(e.currentTarget.value))}
            required
          />
          <Textarea
            label="Ingredients (comma separated)"
            value={form.ingredients.join(', ')}
            onChange={(e) => handleChange('ingredients', e.currentTarget.value.split(',').map(s => s.trim()))}
            required
          />
          <Textarea
            label="Instructions"
            value={form.instructions || ''}
            onChange={(e) => handleChange('instructions', e.currentTarget.value)}
            required
          />
          <Checkbox
            label="Vegan"
            checked={form.isVegan}
            onChange={(e) => handleChange('isVegan', e.currentTarget.checked)}
          />
          <Checkbox
            label="Vegetarian"
            checked={form.isVegetarian}
            onChange={(e) => handleChange('isVegetarian', e.currentTarget.checked)}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setEditOpened(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}