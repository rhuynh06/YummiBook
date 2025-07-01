import { useState } from 'react';
import { 
  Card, 
  TextInput, 
  Select, 
  Slider, 
  Group, 
  Stack,
  Text,
  Badge
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
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

  const activeFiltersCount = Object.values(filters).filter(v => v !== undefined && v !== null && v !== '').length;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* Main Search Bar */}
        <div>
          <TextInput
            size="lg"
            placeholder="Search recipes by name, ingredients, or cuisine..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            leftSection={<IconSearch size={20} />}
            className="mb-4"
          />
        </div>

        {/* Compact Secondary Filters */}
        <div className="space-y-4">
          <Group gap="md" wrap="wrap">
            {/* Cuisine Dropdown */}
            <Select
              size="sm"
              placeholder="Cuisine"
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
                { value: 'AMERICAN', label: 'American' }
              ]}
              value={filters.cuisine || ''}
              onChange={(value) => updateFilter('cuisine', value)}
              clearable
              className="min-w-32"
            />

            {/* Meal Time Dropdown */}
            <Select
              size="sm"
              placeholder="Meal Time"
              data={[
                { value: 'BREAKFAST', label: 'Breakfast' },
                { value: 'LUNCH', label: 'Lunch' },
                { value: 'DINNER', label: 'Dinner' },
                { value: 'SNACK', label: 'Snack' }
              ]}
              value={filters.mealTime || ''}
              onChange={(value) => updateFilter('mealTime', value)}
              clearable
              className="min-w-32"
            />

            {/* Price Slider */}
            <div className="min-w-48">
              <Text size="xs" c="dimmed" className="mb-1">Price: ${filters.maxPrice || 0}</Text>
              <Slider
                size="sm"
                min={0}
                max={50}
                step={1}
                value={filters.maxPrice || 0}
                onChange={(value) => updateFilter('maxPrice', value)}
                label={(value) => `$${value}`}
                className="w-full"
              />
            </div>

            {/* Prep Time Slider */}
            <div className="min-w-48">
              <Text size="xs" c="dimmed" className="mb-1">Prep Time: {filters.maxPrepTime || 0} min</Text>
              <Slider
                size="sm"
                min={0}
                max={120}
                step={5}
                value={filters.maxPrepTime || 0}
                onChange={(value) => updateFilter('maxPrepTime', value)}
                label={(value) => `${value} min`}
                className="w-full"
              />
            </div>
          </Group>

          {/* Action Buttons */}
          <Group justify="space-between" className="pt-2">
            <Group gap="xs">
              {activeFiltersCount > 0 && (
                <Badge color="blue" variant="light">
                  {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                </Badge>
              )}
            </Group>
            <Group gap="xs">
              <button
                onClick={handleClear}
                disabled={isLoading || activeFiltersCount === 0}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Clear
              </button>
              <button
                onClick={handleFilter}
                disabled={isLoading}
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </Group>
          </Group>
        </div>
      </Stack>
    </Card>
  );
} 