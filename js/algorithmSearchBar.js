import { getElementWithoutDiacritics } from "./utils.js";

export class FilterRecipesByLoop {
  constructor(recipes, searchText, keyword, tagsLinks) {
    this.recipes = recipes;
    this.searchText = searchText;
    this.keyword = keyword;
    this.tags = tagsLinks;
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
    if (searchResult.length < 3) {
      return this.recipes;
    }

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

  filterRecipesByKeywords(recipes, keyword) {
    const filteredRecipes = [];
    if (!keyword) {
      // Vérifier si keyword est défini
      return filteredRecipes;
    }
    // commencer la recherche à partir de 3 caractères saisis
    if (keyword.length < 3) {
      return this.recipes;
    }
    // Diviser la chaîne de caractères des mots clés en un tableau de mots
    const keywordsArray = keyword.toLowerCase().trim().split(" ");

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      const ingredientName = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );

      // Vérifier si tous les mots clés correspondent exactement à ceux dans les recettes
      if (
        (ingredientName &&
          this.checkKeywordsInText(ingredientName, keywordsArray)) ||
        (recipe.description &&
          this.checkKeywordsInText(recipe.description, keywordsArray)) ||
        (recipe.ustensils &&
          this.checkKeywordsInArray(recipe.ustensils, keywordsArray)) ||
        (recipe.appliance &&
          this.checkKeywordsInArray([recipe.appliance], keywordsArray))
      ) {
        filteredRecipes.push(recipe);
      }
    }
    return filteredRecipes;
  }

  // Vérifier si tous les mots clés correspondent exactement à ceux dans le texte
  checkKeywordsInText(text, keywordsArray) {
    if (typeof text !== "string") {
      return false;
    }
    for (let i = 0; i < keywordsArray.length; i++) {
      if (!text.toLowerCase().includes(keywordsArray[i])) {
        return false;
      }
    }
    return true;
  }

  // Vérifier si tous les mots clés correspondent exactement à ceux dans le tableau
  checkKeywordsInArray(array, keywordsArray) {
    for (let i = 0; i < keywordsArray.length; i++) {
      let found = false;
      for (let j = 0; j < array.length; j++) {
        if (array[j].toLowerCase() === keywordsArray[i]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
}
