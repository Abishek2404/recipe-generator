import { useNavigate } from "react-router-dom";
import { useRecipe } from "../context/RecipeContext";

function RecipeCard({ recipe, isSaved = false }) {
  const navigate = useNavigate();
  const { saveRecipe, deleteSavedRecipe } = useRecipe();

  const handleSave = async () => {
    try {
      await saveRecipe(recipe);
      alert("Recipe saved successfully!");
    } catch {
      alert("Failed to save recipe");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this recipe?")) {
      await deleteSavedRecipe(recipe._id);
    }
  };

  const handleView = () => {
    if (isSaved) navigate(`/saved/${recipe._id}`);
  };

  return (
    <div className="recipe-card" onClick={handleView}>
      <div className="recipe-card-header">
        <h3>{recipe.title}</h3>
        {recipe.difficulty && (
          <span className={`difficulty-badge${recipe.difficulty.toLowerCase()}`}>
            {recipe.difficulty}
          </span>
        )}
      </div>

      <div className="recipe-card-meta">
        {recipe.prepTime &&<span>Prep: {recipe.prepTime}</span>}
        {recipe.cookTime &&<span>Cook: {recipe.cookTime}</span>}
        {recipe.servings &&<span>Servings: {recipe.servings}</span>}
      </div>

      {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
        <div className="recipe-tags">
          {recipe.dietaryTags.map((tag, i) => (
            <span key={i} className="diet-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="recipe-card-actions">
        {isSaved ? (
          <button
            className="delete-btn"
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
          >
            Delete
          </button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            Save Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;