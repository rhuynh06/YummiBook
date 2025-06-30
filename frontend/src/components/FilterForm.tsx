import { useState } from 'react';
import { 
  Card, 
  TextInput, 
  Select, 
  NumberInput, 
  Checkbox, 
  Button, 
  Group, 
  Stack,
  Title,
  Divider
} from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';
import type { FilterOptions } from '../types/recipe';

interface FilterFormProps {
  onFilter: (filters: FilterOptions) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function FilterForm({ onFilter, onClear, isLoading = false }: FilterFormProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  const updateFilter = (key: keyof FilterOptions, value: string | number | boolean | null) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group>
          <IconFilter size={20} />
          <Title order={3}>Filter Recipes</Title>
        </Group>

        <Group grow>
          <TextInput
            label="Cuisine"
            placeholder="e.g., Italian, Mexican"
            value={filters.cuisine || ''}
            onChange={(e) => updateFilter('cuisine', e.target.value)}
          />
          <TextInput
            label="Ingredient"
            placeholder="e.g., chicken, tomato"
            value={filters.ingredient || ''}
            onChange={(e) => updateFilter('ingredient', e.target.value)}
          />
        </Group>

        <Group grow>
          <Select
            label="Meal Time"
            placeholder="Select meal time"
            data={[
              { value: 'BREAKFAST', label: 'Breakfast' },
              { value: 'LUNCH', label: 'Lunch' },
              { value: 'DINNER', label: 'Dinner' },
              { value: 'SNACK', label: 'Snack' }
            ]}
            value={filters.mealTime || ''}
            onChange={(value) => updateFilter('mealTime', value)}
            clearable
          />
          <NumberInput
            label="Max Price ($)"
            placeholder="e.g., 25"
            min={0}
            value={filters.maxPrice || ''}
            onChange={(value) => updateFilter('maxPrice', value)}
          />
        </Group>

        <Group grow>
          <NumberInput
            label="Max Prep Time (min)"
            placeholder="e.g., 30"
            min={0}
            value={filters.maxPrepTime || ''}
            onChange={(value) => updateFilter('maxPrepTime', value)}
          />
        </Group>

        <Divider />

        <Stack gap="xs">
          <div className="text-sm font-medium">Dietary Preferences</div>
          <Group>
            <Checkbox
              label="Vegan"
              checked={filters.isVegan || false}
              onChange={(e) => updateFilter('isVegan', e.target.checked)}
            />
            <Checkbox
              label="Vegetarian"
              checked={filters.isVegetarian || false}
              onChange={(e) => updateFilter('isVegetarian', e.target.checked)}
            />
          </Group>
        </Stack>

        <Group justify="space-between">
          <Button 
            variant="outline" 
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear Filters
          </Button>
          <Button 
            leftSection={<IconSearch size={16} />}
            onClick={handleFilter}
            loading={isLoading}
          >
            Apply Filters
          </Button>
        </Group>
      </Stack>
    </Card>
  );
} 