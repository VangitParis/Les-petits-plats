import { removeDiacritics } from "../utils/utils.js";
export class FilterRecipesWithFilter {
  constructor(recipes, searchText, keyword) {
    this.recipes = recipes;
    this.searchText = searchText;
    this.filterRecipesByText(recipes, searchText);
    this.filterRecipesByKeywords(recipes, keyword);
  }
  //méthode filter
  filterRecipesByText(recipes, searchText) {
    // on déclare le résultat de la recherche après avoir supprimé les diacritics
    const searchResult = removeDiacritics(searchText);

    if (searchResult.length < 3) {
      return this.recipes;
    }

    // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
    const filteredRecipes = recipes.filter((recipe) => {
      const name = removeDiacritics(recipe.name.toLowerCase().trim());
      const description = removeDiacritics(
        recipe.description.toLowerCase().trim()
      );
      const searchResult = searchText.toLowerCase();
      const termRegExp = new RegExp("\\b" + searchText + "\\b", "i");
      return (
        termRegExp.test(name) ||
        recipe.ingredients.some((ingredient) =>
          termRegExp.test(removeDiacritics(ingredient.ingredient.toLowerCase()))
        ) ||
        termRegExp.test(description)
      );
    });

    // Retourner la liste de recettes filtrées
    return filteredRecipes;
  }

  filterRecipesByKeywords(recipes, keyword) {
    //Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.includes(keyword)
        ) ||
        recipe.ustensils.includes(keyword) ||
        recipe.appliance.includes(keyword)
    );

    //Retourner la liste de recettes filtrées
    return filteredRecipes;
  }
}