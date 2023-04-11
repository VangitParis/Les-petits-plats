export class filterRecipes {
    constructor(recipes, searchText, keyword) {
      this.recipes = recipes;
  
      this.filterRecipesByText(recipes, searchText);
      this.filterRecipesByKeywords(recipes, keyword);
    }
    //méthode filter
    filterRecipesByText(recipes, searchText) {
      // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.includes(searchText) ||
        recipe.ingredients.includes(searchText) ||
        recipe.description.includes(searchText)
      );
    
      // Retourner la liste de recettes filtrées
      return filteredRecipes;
    }
    filterRecipesByKeywords(recipes, keyword) {
      // Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
      const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.includes(keyword) ||
        recipe.ustensils.includes(keyword) ||
        recipe.appliances.includes(keyword)
      );
    
      // Retourner la liste de recettes filtrées
      return filteredRecipes;
    }
  
  }