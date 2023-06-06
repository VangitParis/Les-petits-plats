import { removeDiacritics } from "../utils/utils.js";
export class FilterRecipesWithFilter {
  constructor(recipes, searchText, keyword) {
    this.recipes = recipes;
    this.searchText = searchText;
    this.filterRecipesByText(this.recipes, searchText);
    this.filterRecipesByKeywords(this.recipes, keyword);
  }
  //méthode filter
  filterRecipesByText(recipes, searchText) {
    // on déclare le résultat de la recherche après avoir supprimé les diacritics
    const searchResult = removeDiacritics(searchText.toLowerCase().trim());

    if (searchResult.length < 3) {
      return this.recipes;
    }

    // Utiliser la méthode filter pour filtrer les recettes en fonction du texte de recherche
    const filteredRecipes = this.recipes.filter((recipe) => {
      const name = removeDiacritics(recipe.name.toLowerCase().trim());
      const description = removeDiacritics(
        recipe.description.toLowerCase().trim()
      );
      
      const termRegExp = new RegExp("\\b" + `${searchResult}` + "\\b", "i");
   
      return (
        termRegExp.test(name) ||
        termRegExp.test(description) ||
        recipe.ingredients.some((ingredient) =>
          termRegExp.test(
            removeDiacritics(ingredient.ingredient.toLowerCase().trim())
          )
        )
      );
    });

    // Retourner la liste de recettes filtrées
    return filteredRecipes;
  }

  filterRecipesByKeywords(recipes, keyword) {
    //Utiliser la méthode filter pour filtrer les recettes en fonction des mots clés de recherche
    const filteredRecipes = this.recipes.filter(
      (recipe) =>
        (recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.includes(keyword)
          )) ||
        recipe.ustensils.includes(keyword) ||
        recipe.appliance.includes(keyword)
    );

    //Retourner la liste de recettes filtrées
    return filteredRecipes;
  }
}
