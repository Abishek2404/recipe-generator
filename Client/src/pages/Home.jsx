import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import ImageUploader from "../components/ImageUploader";
import IngredientList from "../components/IngredientList";
import DietaryFilter from "../components/DietaryFilter";
import SuggestionsList from "../components/SuggestionsList";
import Loader from "../components/Loader";

function Home() {
  const navigate = useNavigate();
  const {
    ingredients, loading, error, setError,
    generateRecipe, getRecipeSuggestions, suggestions,
    setRecipe, dietaryPreference,
  } = useRecipe();

  const handleGenerateRecipe = async () => {
    try {
      await generateRecipe();
      navigate("/recipe");
    } catch { /* error is set in context */ }
  };

  const handleGetSuggestions = async () => {
    try {
      await getRecipeSuggestions();
    } catch { /* error is set in context */ }
  };

  const handleSelectSuggestion = async (title) => {
    try {
      const fullIngredients = [...ingredients, title];
      const recipe = await generateRecipe(fullIngredients, dietaryPreference);
      if (recipe) {
        setRecipe(recipe);
        navigate("/recipe");
      }
    } catch { /* error is set in context */ }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>What's in Your Fridge?</h1>
        <p>Upload a photo of your ingredients and let AI create delicious recipes for you</p>
      </section>

      <section className="upload-section">
        <ImageUploader />
      </section>

      {ingredients.length > 0 && (
        <>
          <section className="ingredients-section"><IngredientList /></section>
          <section className="filter-section"><DietaryFilter /></section>
          <section className="action-section">
            <button className="primary-btn" onClick={handleGenerateRecipe} disabled={loading}>
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
            <button className="secondary-btn" onClick={handleGetSuggestions} disabled={loading}>
              {loading ? "Loading..." : "Get Suggestions"}
            </button>
          </section>
        </>
      )}

      {loading &&<Loader message="AI is cooking up something great..." />}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <SuggestionsList suggestions={suggestions} onSelect={handleSelectSuggestion} />
    </div>
  );
}

export default Home;