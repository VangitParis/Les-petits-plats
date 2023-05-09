import { recipes } from "./mock/recipes.js";
import { Dropdown } from "./Dropdowns.js";
import { displayRecipes } from "./recipesCards.js";


//Ajouter un évènement de saisie sur la la recherche avancée
const advancedSearchInputs = Array.from(
  document.getElementsByClassName("form-control")
);

function searchHandler() {
  const searchText = this.value.toLowerCase().trim();
  const dropdown = new Dropdown(recipes, searchText);
  dropdown.specifiesSearch(searchText);
  const filterRecipesAtSearch = dropdown.filterRecipes();
  const updateFilters = dropdown.updateFiltersInDropdown();
  
  const section = document.getElementById("cards");
  section.innerHTML = "";
  displayRecipes(filterRecipesAtSearch, updateFilters);
}

advancedSearchInputs.forEach((advancedSearch) => {
  advancedSearch.addEventListener("input", searchHandler);
});

export function applyFilterByTags() {
  // Récupérer les tags sélectionnés
  const selectedTags = Array.from(
    document.getElementsByClassName("selected")
  ).map((tag) => tag.textContent.toLowerCase());

 // Filtrer les recettes qui correspondent aux tags sélectionnés
 const filteredRecipes = recipes.filter((recipe) => {
  // Vérifier si tous les tags sélectionnés sont présents dans les ingrédients, appareils et ustensiles de la recette
  let recipeTagFound = [
    ...recipe.ingredients.map((ingredient) =>
     removeDiacritics( ingredient.ingredient).toLowerCase()
    ),
    removeDiacritics(recipe.appliance).toLowerCase(),
    ...recipe.ustensils.map((ustensil) => removeDiacritics(ustensil).toLowerCase()),
  ];

    const allSelectedTagsFound = selectedTags.every((tag) =>
      recipeTagFound.includes(tag)
    );
    if (!allSelectedTagsFound) return false;

    // Vérifier si au moins un tag sélectionné est présent dans la recette
    selectedTags.some((tag) => {
      // Vérifier si le tag est présent dans les ingrédients, les appareils ou les ustensiles de la recette
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(tag)) {
          recipeTagFound = true;
        }
      });
      if (recipe.appliance.toLowerCase().includes(tag)) {
        recipeTagFound = true;
      }
      recipe.ustensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(tag)) {
          recipeTagFound = true;
        }
      });
      return recipeTagFound;
    });

    return recipeTagFound ? recipe : null;
  });

  //Afficher les recettes filtrées
  const section = document.getElementById("cards");
  section.innerHTML = "";

  if (filteredRecipes.length === 0) {
    displayRecipes(recipes);
  } else {
    displayRecipes(filteredRecipes); // actualise l'interface
  }
}

// Afficher toutes les recettes initialement
new Dropdown(recipes);

displayRecipes(recipes);
