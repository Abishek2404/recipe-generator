import { useRecipe } from "../context/RecipeContext";

const DIETARY_OPTIONS = [
  { value: "",              label: "No Preference" },
  { value: "vegan",         label: "Vegan" },
  { value: "vegetarian",    label: "Vegetarian" },
  { value: "keto",          label: "Keto" },
  { value: "gluten-free",   label: "Gluten-Free" },
  { value: "dairy-free",    label: "Dairy-Free" },
  { value: "low-carb",      label: "Low Carb" },
  { value: "high-protein",  label: "High Protein" },
  { value: "paleo",         label: "Paleo" },
];

function DietaryFilter() {
  const { dietaryPreference, setDietaryPreference } = useRecipe();

  return (
    <div className="dietary-filter">
      <h3>Dietary Preference</h3>
      <div className="filter-options">
        {DIETARY_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`filter-btn${dietaryPreference === option.value ? "active" : ""}`}
            onClick={() => setDietaryPreference(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DietaryFilter;