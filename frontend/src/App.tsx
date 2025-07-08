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

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<number[]>([]);
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const toggleSelectForDelete = (id: number) => {
    setSelectedForDelete((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await api.deleteRecipes(selectedForDelete);
      setSelectedForDelete([]);
      setDeleteMode(false);
      setConfirmDeleteOpened(false);
      loadAllRecipes();
    } catch (err) {
      alert('Failed to delete recipes.');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // After adding a recipe reload list
  const handleRecipeAdded = () => {
    setAddModalOpened(false);
    loadAllRecipes();
  };

  return (
    <Container size="xl" className="py-8">
      <Stack gap="xl">
        <div className="text-center">
          <img src={logo} alt="YummiBook Logo" style={{ width: '30%', height: 'auto' }} />
          <p className="text-gray-600 text-lg">
            Tasty Recipes by Everyone, for Everyone — From Every Corner of the World
          </p>
        </div>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
            {error}
          </Alert>
        )}

        <FilterForm onFilter={handleFilter} onClear={handleClearFilters} isLoading={isLoading} />

        <Group>
          {isLocalhost && (
            <Button
              color={deleteMode ? '#FF3131' : 'red'}
              onClick={() => {
                setDeleteMode(!deleteMode);
                setSelectedForDelete([]);
            }}
            >
              {deleteMode ? 'Cancel Delete' : 'Delete Recipes'}
            </Button>
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
          opened={confirmDeleteOpened}
          onClose={() => setConfirmDeleteOpened(false)}
          title="Confirm Delete"
          centered
        >
          <Text>
            Are you sure you want to delete {selectedForDelete.length} recipe
            {selectedForDelete.length > 1 ? 's' : ''}?
          </Text>
          <Group>
            <Button variant="default" onClick={() => setConfirmDeleteOpened(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteConfirm} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Modal>
      </Stack>
    </Container>
  );
}

export default App;