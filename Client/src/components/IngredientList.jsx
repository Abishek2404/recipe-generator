import { useState } from "react";
import { useRecipe } from "../context/RecipeContext";

function IngredientList() {
  const { ingredients, setIngredients } = useRecipe();
  const [newIngredient, setNewIngredient] = useState("");

  const addIngredient = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((prev) => [...prev, trimmed]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addIngredient(); }
  };

  if (ingredients.length === 0) return null;

  return (
    <div className="ingredient-list">
      <h3>Detected Ingredients</h3>
      <div className="ingredient-tags">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="ingredient-tag">
            {ingredient}
            <button className="remove-btn" onClick={() => removeIngredient(index)}>
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="add-ingredient">
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add more ingredients..."
          className="ingredient-input"
        />
        <button onClick={addIngredient} className="add-btn">Add</button>
      </div>
    </div>
  );
}

export default IngredientList;