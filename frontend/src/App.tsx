import { useState, useEffect } from 'react';
import { Container, Title, Group, Stack, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { FilterForm } from './components/FilterForm';
import { RecipeList } from './components/RecipeList';
import { api } from './services/api';
import type { Recipe, FilterOptions } from './types/recipe';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all recipes on component mount
  useEffect(() => {
    loadAllRecipes();
  }, []);

  const loadAllRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
      console.error('Error loading recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (filters: FilterOptions) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.filterRecipes(filters);
      setRecipes(data);
    } catch (err) {
      setError('Failed to filter recipes. Please try again.');
      console.error('Error filtering recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    loadAllRecipes();
  };

  return (
    <Container size="xl" className="py-8">
      <Stack gap="xl">
        {/* Header */}
        <div className="text-center">
          <Title order={1} className="text-4xl font-bold text-gray-800 mb-2">
            🍳 CookBook
          </Title>
          <p className="text-gray-600 text-lg">
            Discover delicious recipes from around the world
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert 
            icon={<IconAlertCircle size={16} />} 
            title="Error" 
            color="red"
            variant="light"
          >
            {error}
          </Alert>
        )}

        {/* Main Content */}
        <Group align="flex-start" gap="xl">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <FilterForm 
              onFilter={handleFilter}
              onClear={handleClearFilters}
              isLoading={isLoading}
            />
          </div>

          {/* Recipe List */}
          <div className="flex-1">
            <Group justify="space-between" className="mb-6">
              <Title order={2} className="text-2xl font-semibold">
                Recipes ({recipes.length})
              </Title>
            </Group>
            <RecipeList recipes={recipes} isLoading={isLoading} />
          </div>
        </Group>
      </Stack>
    </Container>
  );
}

export default App;
