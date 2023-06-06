import { removeDiacritics } from "../utils/utils.js";

export class FilterRecipesWithLoop {
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
    const searchTextWithoutDiacritics = removeDiacritics(
      searchText.trim().toLowerCase()
    );
    if (searchTextWithoutDiacritics.length < 3) {
      return this.recipes;
    } 
      // Parcourir toutes les recettes
      for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];
        // Vérifier si le terme de recherche est présent dans le nom de la recette ou dans la description
        const name = removeDiacritics(recipe.name.toLowerCase().trim());
        const description = removeDiacritics(
          recipe.description.toLowerCase().trim()
        );
        // Vérifier si le terme de recherche est présent dans le nom de la recette
        if (name.includes(searchTextWithoutDiacritics)) {
          filteredRecipes.push(recipe);
          continue;
        }

        // Vérifier si le terme de recherche est présent dans la description de la recette
        if (description.includes(searchTextWithoutDiacritics)) {
          const termRegExp = new RegExp("\\b" + searchText + "\\b", "i");
          if (termRegExp.test(description)) {
            filteredRecipes.push(recipe);
          }
          continue;
        }
        // Vérifier si le terme de recherche contient un pluriel
        const pluralSearchText = searchTextWithoutDiacritics.endsWith("s");
      
        // Vérifier si le terme de recherche est présent dans le nom d'un ingrédient
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredientName = removeDiacritics(
            recipe.ingredients[j].ingredient
          )
            .toLowerCase()
            .trim();

          const pluralIngredientName = ingredientName.endsWith("s");
          
          if (ingredientName.includes(searchTextWithoutDiacritics) ||
            (pluralSearchText &&
              pluralIngredientName &&
              searchTextWithoutDiacritics ===
                removeDiacritics(ingredientName.slice(0, -1)).toLowerCase())
          ) {
            console.log(ingredientName.includes(searchTextWithoutDiacritics));
            filteredRecipes.push(recipe);
            break; // Passer à la recette suivante si le terme de recherche est trouvé dans le nom d'un ingrédient
          }
        }
        // Vérifier si le terme de recherche est présent dans le nom d'un appareil
        if (
          removeDiacritics(recipe.appliance)
            .toLowerCase()
            .includes(searchTextWithoutDiacritics)
        ) {
          filteredRecipes.push(recipe);
          continue;
        }
        // Vérifier si le terme de recherche est présent dans le nom d'un ustensil
        for (let utensil of recipe.ustensils) {
          const utensilName = removeDiacritics(utensil).toLowerCase();
          const pluralUtensilName = utensilName.endsWith("s");
          const regex = new RegExp("\\b" + searchTextWithoutDiacritics + "\\b");
          if (
            regex.test(utensilName) ||
            (pluralSearchText &&
              pluralUtensilName &&
              searchTextWithoutDiacritics ===
                removeDiacritics(utensilName.slice(0, -1)).toLowerCase())
          ) {
            filteredRecipes.push(recipe);
            break; // Passer à la recette suivante si le terme de recherche est trouvé dans le nom d'un ustensile
          }
        }
      

      return filteredRecipes;
    }
  }

  filterRecipesByKeywords(recipes, keyword) {
    const filteredRecipes = [];
    if (!keyword) {
      // Vérifier si keyword est défini
      return filteredRecipes;
    }
    // commencer la recherche à partir de 3 caractères saisis
    if (keyword.length < 3) {
      return recipes;
    }
    // Diviser la chaîne de caractères des mots clés en un tableau de mots
    const keywordsArray = keyword.toLowerCase().trim().split(" ");

    for (let i = 0; i < recipes.length; i++) {
      const recipe = this.recipes[i];

      const ingredientName = recipe.ingredients.map(
        (ingredient) => ingredient.ingredient
      );

      // Vérifier si tous les mots clés correspondent exactement à ceux dans les recettes
      if (
        ingredientName &&
        this.checkKeywordsInText(ingredientName, keywordsArray) &&
        recipe.description &&
        this.checkKeywordsInText(recipe.description, keywordsArray) &&
        recipe.ustensils &&
        this.checkKeywordsInArray(recipe.ustensils, keywordsArray) &&
        recipe.appliance &&
        this.checkKeywordsInArray([recipe.appliance], keywordsArray)
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
