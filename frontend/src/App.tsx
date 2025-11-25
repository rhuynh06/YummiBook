import { useState, useEffect } from 'react';
import {
  Container,
  Group,
  Stack,
  Alert,
  Button,
  Modal,
  Text,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { FilterForm } from './components/FilterForm';
import { RecipeList } from './components/RecipeList';
import { AddRecipeForm } from './components/AddRecipeForm';
import { api } from './services/api';
import type { Recipe, FilterOptions } from './types/recipe';
import { isLocalhost } from './config';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addModalOpened, setAddModalOpened] = useState(false);

  // Pagination state
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<number[]>([]);
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadRecipes();
  }, []);

  /**
   * Load recipes (with optional filters)
   */
  const loadRecipes = async (filters: FilterOptions = {}, resetList = true) => {
    setIsLoading(true);
    setError(null);
    
    if (resetList) {
      setRecipes([]);
      setCursor(null);
    }
    
    try {
      const { data, nextCursor, hasMore } = await api.getRecipes(filters);
      setRecipes(resetList ? data : [...recipes, ...data]);
      setCursor(nextCursor);
      setHasMore(hasMore);
      setCurrentFilters(filters);
    } catch (err) {
      setError(
        'Failed to load recipes. Please try again in a moment. If the issue continues, contact support at ryanhuynh200604@gmail.com or reach out on GitHub (@rhuynh06).'
      );
      console.error('Error loading recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load more recipes with current filters
   */
  const loadMoreRecipes = async () => {
    if (!hasMore || isLoading || !cursor) return;

    setIsLoading(true);
    try {
      const { data, nextCursor, hasMore: more } = await api.getRecipes(
        currentFilters,
        cursor
      );
      setRecipes((prev) => [...prev, ...data]);
      setCursor(nextCursor);
      setHasMore(more);
    } catch (err) {
      setError('Failed to load more recipes.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle filter changes
   */
  const handleFilter = async (filters: FilterOptions) => {
    await loadRecipes(filters, true);
  };

  /**
   * Clear all filters and reload
   */
  const handleClearFilters = () => {
    loadRecipes({}, true);
  };

  /**
   * Toggle recipe selection for deletion
   */
  const toggleSelectForDelete = (id: number) => {
    setSelectedForDelete((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /**
   * Confirm and execute deletion
   */
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await api.deleteRecipes(selectedForDelete);
      setSelectedForDelete([]);
      setDeleteMode(false);
      setConfirmDeleteOpened(false);
      await loadRecipes(currentFilters, true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete recipes.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Handle successful recipe addition
   */
  const handleRecipeAdded = () => {
    setAddModalOpened(false);
    loadRecipes(currentFilters, true);
  };

  /**
   * Open delete confirmation modal
   */
  const handleDeleteClick = () => {
    if (selectedForDelete.length === 0) {
      setError('Please select at least one recipe to delete.');
      return;
    }
    setConfirmDeleteOpened(true);
  };

  return (
    <Container size="xl" className="py-8">
      <Stack gap="xl">
        <div className="text-center">
          <img
            src={logo}
            alt="YummiBook Logo"
            style={{ width: '30%', height: 'auto' }}
          />
          <p className="text-gray-600 text-lg">
            Tasty Recipes by Everyone, for Everyone — From Every Corner of the World
          </p>
        </div>

        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error"
            color="red"
            variant="light"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <FilterForm
          onFilter={handleFilter}
          onClear={handleClearFilters}
          isLoading={isLoading}
        />

        <Group>
          {isLocalhost && (
            <>
              <Button
                color={deleteMode ? '#FF3131' : 'red'}
                onClick={() => {
                  setDeleteMode(!deleteMode);
                  setSelectedForDelete([]);
                }}
              >
                {deleteMode ? 'Cancel Delete' : 'Delete Recipes'}
              </Button>

              {deleteMode && selectedForDelete.length > 0 && (
                <Button color="red" variant="filled" onClick={handleDeleteClick}>
                  Delete Selected ({selectedForDelete.length})
                </Button>
              )}
            </>
          )}

          <Button onClick={() => setAddModalOpened(true)}>Add Recipe</Button>
        </Group>

        <RecipeList
          recipes={recipes}
          isLoading={isLoading}
          deleteMode={deleteMode}
          selectedRecipeIds={selectedForDelete}
          onSelectDelete={toggleSelectForDelete}
        />

        {/* Load More Button */}
        {hasMore && !isLoading && recipes.length > 0 && (
          <Button
            onClick={loadMoreRecipes}
            fullWidth
            variant="light"
            size="lg"
          >
            Load More Recipes
          </Button>
        )}

        {/* No results message */}
        {!isLoading && recipes.length === 0 && (
          <Text size="lg" c="dimmed" ta="center">
            No recipes found. Try adjusting your filters or add a new recipe!
          </Text>
        )}

        {/* Add Recipe Modal */}
        <Modal
          opened={addModalOpened}
          onClose={() => setAddModalOpened(false)}
          title="Add New Recipe"
          size="lg"
          centered
        >
          <AddRecipeForm onAdded={handleRecipeAdded} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={confirmDeleteOpened}
          onClose={() => setConfirmDeleteOpened(false)}
          title="Confirm Delete"
          centered
        >
          <Stack gap="md">
            <Text>
              Are you sure you want to delete {selectedForDelete.length} recipe
              {selectedForDelete.length > 1 ? 's' : ''}? This action cannot be undone.
            </Text>
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => setConfirmDeleteOpened(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={handleDeleteConfirm}
                loading={isDeleting}
              >
                Delete
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}

export default App;