import { getElementWithoutDiacritics } from "./utils.js";

export class FilterRecipes {
  constructor(recipes, searchText, keyword) {
    this.recipes = recipes;
    this.searchText = searchText;
    this.keyword = keyword;
    this.filteredRecipes = this.filterRecipesByText(
      this.recipes,
      this.searchText
    );
    this.filterRecipesByKeywords();
  }
  //Filtrage par Texte libre à partir de 3 caractères saisis
  filterRecipesByText(recipes, searchText) {
    const filteredRecipes = [];

    // on déclare le résultat de la recherche après avoir supprimé les diacritics
    const searchResult = getElementWithoutDiacritics(searchText);

    // Vérifier si le terme de recherche contient un pluriel
    const pluralSearchResult = searchResult.endsWith("s");

    // Parcourir toutes les recettes
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Vérifier si le terme de recherche est présent dans le nom de la recette ou dans la description
      const name = getElementWithoutDiacritics(recipe.name);

      const description = getElementWithoutDiacritics(recipe.description);

      // Vérifier si le terme de recherche est présent dans le nom de la recette
      if (name.includes(searchResult)) {
        filteredRecipes.push(recipe);
        continue;
      }

      // Vérifier si le terme de recherche est présent dans la description de la recette
      if (description.includes(searchResult)) {
        filteredRecipes.push(recipe);
        continue;
      }

      // Vérifier si le terme de recherche est présent dans le nom d'un ingrédient
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = getElementWithoutDiacritics(
          recipe.ingredients[j].ingredient
        );
        const pluralIngredientName = ingredientName.endsWith("s");
        if (
          ingredientName.includes(searchResult) ||
          (pluralSearchResult &&
            pluralIngredientName &&
            searchResult ===
              getElementWithoutDiacritics(ingredientName.slice(0, -1)))
        ) {
          filteredRecipes.push(recipe);
          break; // Passer à la recette suivante si le terme de recherche est trouvé dans le nom d'un ingrédient
        }
      }
    }

    return filteredRecipes;
  }
  // Filtrage par mots clés
  filterRecipesByKeywords(recipes, keyword) {
    const filteredRecipes = [];
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      if (
        (recipe.description && recipe.description.includes(keyword)) ||
        (recipe.ustensils && recipe.ustensils.includes(keyword)) ||
        (recipe.appliance && recipe.appliance.includes(keyword))
      ) {
        filteredRecipes.push(recipe);
      }
    }
    return filteredRecipes;
  }
}
