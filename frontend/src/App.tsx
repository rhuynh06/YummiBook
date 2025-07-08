import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Group,
  Stack,
  Alert,
  Button,
  Modal,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { FilterForm } from './components/FilterForm';
import { RecipeList } from './components/RecipeList';
import { AddRecipeForm } from './components/AddRecipeForm';
import { api } from './services/api';
import type { Recipe, FilterOptions } from './types/recipe';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addModalOpened, setAddModalOpened] = useState(false);

  // New delete mode & selected recipe state
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<Recipe | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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

  const handleRecipeAdded = () => {
    setAddModalOpened(false);
    loadAllRecipes();
  };

  // Delete handlers
  const handleSelectDelete = (recipe: Recipe) => {
    setSelectedToDelete(recipe);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedToDelete) return;
    setIsLoading(true);
    setError(null);
    try {
      await api.deleteRecipe(selectedToDelete.id);
      setConfirmDeleteOpen(false);
      setSelectedToDelete(null);
      setDeleteMode(false);
      loadAllRecipes();
    } catch (err) {
      setError('Failed to delete recipe.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

  return (
    <Container size="xl" className="py-8">
      <Stack gap="xl">
        <div className="text-center">
          <Title order={1} className="text-4xl font-bold text-gray-800 mb-2">
            🍳 CookBook
          </Title>
          <p className="text-gray-600 text-lg">
            Discover delicious recipes from around the world
          </p>
        </div>

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

        <FilterForm
          onFilter={handleFilter}
          onClear={handleClearFilters}
          isLoading={isLoading}
        />

        <div>
          <Group justify="space-between" className="mb-6">
            <Title order={2} className="text-2xl font-semibold">
              Recipes ({recipes.length})
            </Title>
            <Group>
              {/* Only show Select Delete on localhost */}
              {isLocalhost && (
                <Button
                  color={deleteMode ? 'red' : 'gray'}
                  variant={deleteMode ? 'filled' : 'outline'}
                  onClick={() => {
                    setDeleteMode(!deleteMode);
                    setSelectedToDelete(null);
                    setConfirmDeleteOpen(false);
                  }}
                  disabled={isLoading}
                >
                  {deleteMode ? 'Cancel Delete' : 'Select Delete'}
                </Button>
              )}
              <Button onClick={() => setAddModalOpened(true)} disabled={deleteMode}>
                Add Recipe
              </Button>
            </Group>
          </Group>

          <RecipeList
            recipes={recipes}
            isLoading={isLoading}
            deleteMode={deleteMode}
            selectedRecipeId={selectedToDelete?.id ?? null}
            onSelectDelete={handleSelectDelete}
          />
        </div>

        <Modal
          opened={addModalOpened}
          onClose={() => setAddModalOpened(false)}
          title="Add New Recipe"
          size="lg"
          centered
        >
          <AddRecipeForm onAdded={handleRecipeAdded} />
        </Modal>

        <Modal
          opened={confirmDeleteOpen}
          onClose={() => {
            setConfirmDeleteOpen(false);
            setSelectedToDelete(null);
          }}
          title="Confirm Delete"
          centered
          size="sm"
        >
          <p>
            Are you sure you want to delete{' '}
            <strong>{selectedToDelete?.name}</strong>?
          </p>
          <Group grow>
            <Button
              variant="default"
              onClick={() => {
                setConfirmDeleteOpen(false);
                setSelectedToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Group>
        </Modal>
      </Stack>
    </Container>
  );
}

export default App;