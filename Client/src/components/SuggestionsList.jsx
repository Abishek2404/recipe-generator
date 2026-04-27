function SuggestionsList({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestions-list-container">
      <h3>Recipe Suggestions</h3>
      <p className="suggestions-subtitle">Choose a recipe to get full details:</p>
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggestion-card"
            onClick={() => onSelect(suggestion.title)}
          >
            <h4>{suggestion.title}</h4>
            <p>{suggestion.description}</p>
            <div className="suggestion-meta">
              <span className={`difficulty-badge${suggestion.difficulty?.toLowerCase()}`}>
                {suggestion.difficulty}
              </span>
              <span>{suggestion.cookTime}</span>
            </div>
            {suggestion.dietaryTags && (
              <div className="recipe-tags">
                {suggestion.dietaryTags.map((tag, i) => (
                  <span key={i} className="diet-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionsList;