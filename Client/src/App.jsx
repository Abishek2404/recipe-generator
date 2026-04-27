import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeResult from "./pages/RecipeResult";
import SavedRecipes from "./pages/SavedRecipes";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/recipe"     element={<RecipeResult />} />
          <Route path="/saved"      element={<SavedRecipes />} />
          <Route path="/saved/:id"  element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;