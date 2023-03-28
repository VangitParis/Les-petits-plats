//methode filter
function filterRecipesByText(recipes, searchText) {
    // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
    const filteredRecipes = recipes.filter(recipe =>
      recipe.title.includes(searchText) ||
      recipe.ingredients.includes(searchText) ||
      recipe.description.includes(searchText)
    );
  
    // Retourner la liste de recettes filtrées
    return filteredRecipes;
  }
  
  function filterRecipesByKeywords(recipes, keyword) {
    // Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
    const filteredRecipes = recipes.filter(recipe =>
      recipe.ingredients.includes(keyword) ||
      recipe.ustensils.includes(keyword) ||
      recipe.appliances.includes(keyword)
    );
  
    // Retourner la liste de recettes filtrées
    return filteredRecipes;
  }

  
  