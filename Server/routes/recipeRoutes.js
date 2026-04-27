const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  analyzeImage,
  generateRecipe,
  generateMultipleRecipes,
  saveRecipe,
  getSavedRecipes,
  getRecipeById,
  deleteRecipe,
} = require("../controllers/recipeController");

// ── AI Routes ────────────────────────────────────────────────
router.post("/analyze",     upload.single("image"), analyzeImage);
router.post("/generate",    generateRecipe);
router.post("/suggestions", generateMultipleRecipes);

// ── CRUD Routes ──────────────────────────────────────────────
router.post("/save",        saveRecipe);
router.get("/saved",        getSavedRecipes);
router.get("/saved/:id",    getRecipeById);
router.delete("/saved/:id", deleteRecipe);

module.exports = router;