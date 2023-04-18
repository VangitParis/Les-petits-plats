import { getElementWithoutDiacritics } from "./utils.js";
export class FilterRecipes {
    constructor(recipes, searchText, keyword) {
      this.recipes = recipes;
      this.searchText = searchText;
      this.filterRecipesByText(recipes, searchText);
      this.filterRecipesByKeywords(recipes, keyword);
    }
    //méthode filter
  filterRecipesByText(recipes, searchText) {
    
    // on déclare le résultat de la recherche après avoir supprimé les diacritics
    const searchResult = getElementWithoutDiacritics(searchText);
 
    if (searchResult.length < 3) {
      return this.recipes;
    }

      // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.includes(searchResult) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.includes(searchResult))||
        recipe.description.includes(searchResult)
      );
    
    
      // Retourner la liste de recettes filtrées
      return filteredRecipes;
  }
  
    filterRecipesByKeywords(recipes, keyword) {
      //Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
      const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.ingredient.includes(keyword)) ||
        recipe.ustensils.includes(keyword) ||
        recipe.appliance.includes(keyword)
      );
    
      //Retourner la liste de recettes filtrées
      return filteredRecipes;
    }
  
  }