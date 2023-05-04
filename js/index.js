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
  dropdown.searchObjectInDropdown();
  const filterRecipesAtSearch = dropdown.filterRecipes();
  const updateFilters = dropdown.updateFilters();
  
  const section = document.getElementById("cards");
  section.innerHTML = "";
  displayRecipes(filterRecipesAtSearch, updateFilters);
}

advancedSearchInputs.forEach((advancedSearch) => {
  advancedSearch.addEventListener("input", searchHandler);
});



// Afficher toutes les recettes initialement
new Dropdown(recipes);

displayRecipes(recipes);
