export interface Recipe {
  id: number;
  name: string;
  price: number;
  cuisine: string;
  prepTime: number;
  mealTime: string;
  isVegan: boolean;
  isVegetarian: boolean;
  ingredients: string[];
  instructions?: string;
}

export interface FilterOptions {
  cuisine?: string;
  maxPrice?: number;
  mealTime?: string;
  isVegan?: boolean;
  isVegetarian?: boolean;
  search?: string;
  maxPrepTime?: number;
} 

export const cuisineOptions = [
  { value: 'AMERICAN', label: 'American' },
  { value: 'ARGENTINIAN', label: 'Argentinian' },
  { value: 'AUSTRALIAN', label: 'Australian' },
  { value: 'BRAZILIAN', label: 'Brazilian' },
  { value: 'BRITISH', label: 'British' },
  { value: 'CAJUN', label: 'Cajun' },
  { value: 'CARIBBEAN', label: 'Caribbean' },
  { value: 'CHINESE', label: 'Chinese' },
  { value: 'CREOLE', label: 'Creole' },
  { value: 'CUBAN', label: 'Cuban' },
  { value: 'ETHIOPIAN', label: 'Ethiopian' },
  { value: 'FILIPINO', label: 'Filipino' },
  { value: 'FRENCH', label: 'French' },
  { value: 'GERMAN', label: 'German' },
  { value: 'GREEK', label: 'Greek' },
  { value: 'INDIAN', label: 'Indian' },
  { value: 'INDONESIAN', label: 'Indonesian' },
  { value: 'ITALIAN', label: 'Italian' },
  { value: 'JAMAICAN', label: 'Jamaican' },
  { value: 'JAPANESE', label: 'Japanese' },
  { value: 'KOREAN', label: 'Korean' },
  { value: 'LEBANESE', label: 'Lebanese' },
  { value: 'MALAYSIAN', label: 'Malaysian' },
  { value: 'MEDITERRANEAN', label: 'Mediterranean' },
  { value: 'MEXICAN', label: 'Mexican' },
  { value: 'MEXICAN-AMERICAN', label: 'Mexican-American' },
  { value: 'MOROCCAN', label: 'Moroccan' },
  { value: 'PERUVIAN', label: 'Peruvian' },
  { value: 'POLISH', label: 'Polish' },
  { value: 'PUERTO RICAN', label: 'Puerto Rican' },
  { value: 'RUSSIAN', label: 'Russian' },
  { value: 'SCANDINAVIAN', label: 'Scandinavian' },
  { value: 'SICILIAN', label: 'Sicilian' },
  { value: 'SOUTH AFRICAN', label: 'South African' },
  { value: 'SPANISH', label: 'Spanish' },
  { value: 'THAI', label: 'Thai' },
  { value: 'TURKISH', label: 'Turkish' },
  { value: 'VIETNAMESE', label: 'Vietnamese' },
];