import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeDisplay from "../components/RecipeDisplay";
import Loader from "../components/Loader";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe,  setRecipe]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/saved/${id}`);
        setRecipe(data);
      } catch {
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return<Loader message="Loading recipe..." />;

  if (error) {
    return (
      <div className="error-page">
        <h2>{error}</h2>
        <button className="primary-btn" onClick={() => navigate("/saved")}>
          Back to Saved Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <button className="back-btn" onClick={() => navigate("/saved")}>&larr; Back to Saved Recipes</button>
      <RecipeDisplay recipe={recipe} />
    </div>
  );
}

export default RecipeDetail;