import { removeDiacritics } from "../utils/utils.js";
export class FilterRecipesWithFilter {
  constructor(recipes, searchText, keyword) {
    this.recipes = recipes;
    this.searchText = searchText;
    this.filteredRecipesByText = [];
    this.filteredRecipesByKeywords = [];
    this.filterRecipesByText(this.recipes, this.searchText);
    this.filterRecipesByKeywords(this.recipes, this.keyword);
  }
  //méthode filter
  filterRecipesByText(recipes, searchText) {
    // on déclare le résultat de la recherche après avoir supprimé les diacritics
    const searchResult = removeDiacritics(this.searchText);

    if (searchResult.length < 3) {
      return this.recipes;
    }

    // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
    const filteredRecipes = this.recipes.filter((recipe) => {
      const name = removeDiacritics(recipe.name.toLowerCase().trim()).split(" ").join(" ");
      const description = removeDiacritics(
        recipe.description.toLowerCase().trim()
      );
      const termRegExp = new RegExp("\\b" + searchResult + "\\b", "i");
      return (
        termRegExp.test(name) ||
        recipe.ingredients.some((ingredient) =>
          termRegExp.test(removeDiacritics(ingredient.ingredient.toLowerCase()))
        ) ||
        termRegExp.test(description)
      );
    });
    // Stocker les recettes filtrées dans la propriété filteredRecipesByText
    this.filteredRecipesByText = filteredRecipes;
    // Retourner la liste de recettes filtrées
    return filteredRecipes;
  }

  filterRecipesByKeywords(recipes, keyword) {
    //Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
    const filteredRecipes = this.recipes.filter((recipe) => {
      // Vérifier si le nom de la recette contient le mot clé
    const nameContainsKeyword = removeDiacritics(recipe.name.toLowerCase()).includes(keyword);

    // Vérifier si la description de la recette contient le mot clé
    const descriptionContainsKeyword = removeDiacritics(recipe.description.toLowerCase()).includes(keyword);
      // Vérifier si l'ingrédient contient le mot clé
      const ingredientContainsKeyword = recipe.ingredients.some((ingredient) =>
        removeDiacritics(ingredient.ingredient.toLowerCase()).includes(keyword)
      );
  
      // Vérifier si le mot clé correspond à l'appareil ou aux ustensiles
      const keywordMatchesAppliance = removeDiacritics(recipe.appliance.toLowerCase()).includes(keyword);
      const keywordMatchesUtensils = recipe.ustensils.some((utensil) =>
        removeDiacritics(utensil.toLowerCase()).includes(keyword)
      );
  
      // Retourner true si le mot clé correspond à l'ingrédient, à l'appareil ou aux ustensiles
      return nameContainsKeyword || descriptionContainsKeyword || ingredientContainsKeyword || keywordMatchesAppliance || keywordMatchesUtensils;
    });
    // Stocker les recettes filtrées dans la propriété filteredRecipesByKeywords
    this.filteredRecipesByKeywords = filteredRecipes;
    //Retourner la liste de recettes filtrées
    return filteredRecipes;
  }
}
