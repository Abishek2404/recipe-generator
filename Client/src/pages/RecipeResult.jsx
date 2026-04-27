import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";
import RecipeDisplay from "../components/RecipeDisplay";

function RecipeResult() {
  const navigate = useNavigate();
  const { recipe, clearRecipe } = useRecipe();

  const handleBack = () => {
    clearRecipe();
    navigate("/");
  };

  if (!recipe) {
    return (
      <div className="no-recipe">
        <h2>No recipe generated yet</h2>
        <p>Go back and upload an image to get started!</p>
        <button className="primary-btn" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="recipe-result-page">
      <button className="back-btn" onClick={handleBack}>&larr; Back to Home</button>
      <h2>Your AI-Generated Recipe</h2>
      <RecipeDisplay recipe={recipe} />
    </div>
  );
}

export default RecipeResult;