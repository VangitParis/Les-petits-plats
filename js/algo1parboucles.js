// Filtrage par texte libre
export function filterRecipesByText(recipes, searchText) {
    const trimmedSearchText = searchText.trim().toLowerCase();
    // initié le tableau de la recherche 
    const filteredRecipes = [];
    //boucler sur le nom, les ingrédients et la description
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const name = recipe.name.trim().toLowerCase();
        const ingredients = recipe.ingredients.map(i => i.ingredient.trim().toLowerCase()).join(", ");
        const description = recipe.description.trim().toLowerCase();
        if (
            name.includes(trimmedSearchText) ||
            ingredients.includes(trimmedSearchText) ||
            description.includes(trimmedSearchText)
        ) {
            // ajouter au tableau 
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

  
  
  // Filtrage par mots clés
  export function filterRecipesByKeywords(recipes, keyword) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (
        recipe.description && recipe.description.includes(keyword) ||
        recipe.ustensils && recipe.ustensils.includes(keyword) ||
          recipe.appliance && recipe.appliance.includes(keyword) ||
          recipe.time && recipe.time.includes(keyword)
      ) {
        filteredRecipes.push(recipe);
      }
    }
    return filteredRecipes;
  }