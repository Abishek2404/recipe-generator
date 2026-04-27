import RecipeCard from "./RecipeCard";

function RecipeDisplay({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="recipe-display">
      <RecipeCard recipe={recipe} />

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients?.map((ing, i) => (
            <li key={i}>
              <span className="ing-name">{ing.name}</span>
              {ing.quantity &&<span className="ing-quantity"> - {ing.quantity}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Step-by-Step Instructions</h3>
        <ol className="instructions-list">
          {recipe.instructions?.map((inst, i) => (
            <li key={i} className="instruction-step">
              <span className="step-number">Step {inst.step}</span>
              <p>{inst.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {recipe.nutrition && (
        <div className="recipe-section">
          <h3>Nutritional Information</h3>
          <div className="nutrition-grid">
            {["calories", "protein", "carbs", "fat", "fiber"].map((key) => (
              <div key={key} className="nutrition-item">
                <span className="nutrition-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="nutrition-value">{recipe.nutrition[key]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recipe.servingSuggestions && recipe.servingSuggestions.length > 0 && (
        <div className="recipe-section">
          <h3>Serving Suggestions</h3>
          <ul className="suggestions-list">
            {recipe.servingSuggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeDisplay;