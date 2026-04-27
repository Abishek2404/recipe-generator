import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const RecipeContext = createContext();

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [ingredients,       setIngredients]       = useState([]);
  const [recipe,            setRecipe]            = useState(null);
  const [suggestions,       setSuggestions]       = useState([]);
  const [savedRecipes,      setSavedRecipes]      = useState([]);
  const [loading,           setLoading]           = useState(false);
  const [error,             setError]             = useState(null);
  const [dietaryPreference, setDietaryPreference] = useState("");

  const API_BASE = "/api/recipes";

  const analyzeImage = useCallback(async (imageFile) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post(`${API_BASE}/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIngredients(data.ingredients);
      return data.ingredients;
    } catch (err) {
      const message = err.response?.data?.error || "Failed to analyze image";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateRecipe = useCallback(
    async (ingredientList, diet) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post(`${API_BASE}/generate`, {
          ingredients: ingredientList || ingredients,
          dietaryPreference: diet || dietaryPreference,
        });

        setRecipe(data.recipe);
        return data.recipe;
      } catch (err) {
        const message = err.response?.data?.error || "Failed to generate recipe";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [ingredients, dietaryPreference]
  );

  const getRecipeSuggestions = useCallback(
    async (ingredientList, diet) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post(`${API_BASE}/suggestions`, {
          ingredients: ingredientList || ingredients,
          dietaryPreference: diet || dietaryPreference,
        });

        setSuggestions(data.suggestions);
        return data.suggestions;
      } catch (err) {
        const message = err.response?.data?.error || "Failed to get suggestions";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [ingredients, dietaryPreference]
  );

  const saveRecipe = useCallback(async (recipeData) => {
    try {
      const { data } = await axios.post(`${API_BASE}/save`, recipeData);
      setSavedRecipes((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Failed to save recipe";
      setError(message);
      throw new Error(message);
    }
  }, []);

  const fetchSavedRecipes = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`${API_BASE}/saved?${params}`);
      setSavedRecipes(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || "Failed to fetch recipes";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSavedRecipe = useCallback(async (id) => {
    try {
      await axios.delete(`${API_BASE}/saved/${id}`);
      setSavedRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      const message = err.response?.data?.error || "Failed to delete recipe";
      setError(message);
      throw new Error(message);
    }
  }, []);

  const clearRecipe = useCallback(() => {
    setRecipe(null);
    setSuggestions([]);
    setError(null);
  }, []);

  const value = {
    ingredients, setIngredients,
    recipe, setRecipe,
    suggestions,
    savedRecipes,
    loading,
    error, setError,
    dietaryPreference, setDietaryPreference,
    analyzeImage,
    generateRecipe,
    getRecipeSuggestions,
    saveRecipe,
    fetchSavedRecipes,
    deleteSavedRecipe,
    clearRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};