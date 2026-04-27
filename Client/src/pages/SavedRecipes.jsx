import { useEffect, useState, useMemo } from "react";
import { useRecipe } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

function SavedRecipes() {
  const { savedRecipes, fetchSavedRecipes, loading } = useRecipe();
  const [filterDiet,       setFilterDiet]       = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [searchTerm,       setSearchTerm]       = useState("");

  useEffect(() => { fetchSavedRecipes(); }, [fetchSavedRecipes]);

  const filteredRecipes = useMemo(() => {
    return savedRecipes.filter((recipe) => {
      const matchesDiet       = !filterDiet       || recipe.dietaryTags?.includes(filterDiet);
      const matchesDifficulty = !filterDifficulty || recipe.difficulty === filterDifficulty;
      const matchesSearch     = !searchTerm       || recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDiet && matchesDifficulty && matchesSearch;
    });
  }, [savedRecipes, filterDiet, filterDifficulty, searchTerm]);

  if (loading) return<Loader message="Loading saved recipes..." />;

  return (
    <div className="saved-recipes-page">
      <h2>Saved Recipes</h2>
      <div className="filters-bar">
        <input type="text" placeholder="Search recipes..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        <select value={filterDiet} onChange={(e) => setFilterDiet(e.target.value)} className="filter-select">
          <option value="">All Diets</option>
          {["vegan","vegetarian","keto","gluten-free","dairy-free","low-carb","high-protein","paleo"].map(d => (
            <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
          ))}
        </select>
        <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="filter-select">
          <option value="">All Difficulties</option>
          {["Easy","Medium","Hard"].map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <p>{savedRecipes.length === 0
            ? "No saved recipes yet. Generate and save your first recipe!"
            : "No recipes match your filters."}</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} isSaved={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;