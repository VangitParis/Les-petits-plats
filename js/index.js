import { recipes } from "./mock/recipes.js";
import { FilterRecipesWithLoop } from "./algorithm/algorithmSearchBar.js";
import { Dropdown } from "./Classes/Dropdowns.js";
import { removeDiacritics } from "./utils.js";
import { displayRecipes } from "./template/recipeCards.js";

// Fonction qui gère la recherche et le filtre des recettes
function handleSearch(text) {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase();
  const filterInSearchBar = new FilterRecipesWithLoop(recipes, searchText);
  const filteredRecipesByText = filterInSearchBar.filterRecipesByText(
    recipes,
    searchText
  );
  const filteredRecipesByKeyword = filterInSearchBar.filterRecipesByKeywords(
    recipes,
    searchText
  );

  // Fusionner les résultats des deux filtres en une seule liste de recettes uniques
  const filterUniqueRecipes = [
    ...new Set([...filteredRecipesByText, ...filteredRecipesByKeyword]),
  ];

  const section = document.getElementById("cards");
  section.innerHTML = "";

  if (filterUniqueRecipes.length === 0) {
    const divMessage = document.createElement("div");
    const message = document.createElement("p");
    message.textContent =
      'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
    message.classList.add("error");
    divMessage.appendChild(message);
    section.appendChild(divMessage);
  } else {
    new Dropdown(filterUniqueRecipes);
    
    displayRecipes(filterUniqueRecipes); // actualise l'interface
  }
}

// Ajouter un événement de saisie sur la barre de recherche
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
searchInput.addEventListener("input", handleSearch);
searchInput.addEventListener("Enter", handleSearch);
searchButton.addEventListener("click", handleSearch);

//Ajouter un évènement de saisie sur la la recherche avancée
const searchIngredients = document.getElementById("inputSearchIngredients");
const searchAppliances = document.getElementById("inputSearchAppliances");
const searchUstensils = document.getElementById("inputSearchUstensils");
const advancedSearchInputs = [
  searchIngredients,
  searchAppliances,
  searchUstensils,
];

// Filtre les recettes et met à jour les élément dans les dropdowns
function advancedSearch(text) {
  // Vérifier si l'élément existe déjà dans la liste
  const existingTag = document.getElementById(`tag-id-${text}`);

  if (existingTag) {
    return;
  }

  const dropdown = new Dropdown(recipes);
  dropdown.specifiesSearch();
  const filteredRecipes = dropdown.filterRecipes();
  
  //Afficher les recettes filtrées
  const section = document.getElementById("cards");
  section.innerHTML = "";

  displayRecipes(filteredRecipes); // actualise l'interface
}

advancedSearchInputs.forEach((advancedSearchInput) => {
  advancedSearchInput.addEventListener("input", advancedSearch);
  advancedSearchInput.addEventListener("Enter", advancedSearch);
});

export function applyFilterByTags() {
  // Récupérer les tags sélectionnés
  const selectedTags = Array.from(
    document.getElementsByClassName("selected")
  ).map((tag) => removeDiacritics(tag.textContent).toLowerCase());

  // Filtrer les recettes qui correspondent aux tags sélectionnés
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifier si tous les tags sélectionnés sont présents dans les ingrédients, appareils et ustensiles de la recette
    const ingredientsRecipes = recipe.ingredients.map((ingredient) =>
      removeDiacritics(ingredient.ingredient).toLowerCase()
    );
    const applianceRecipe = removeDiacritics(recipe.appliance).toLowerCase();
    const ustensilsRecipes = recipe.ustensils.map((ustensil) =>
      removeDiacritics(ustensil).toLowerCase()
    );

    let recipeTagFound = [
      applianceRecipe,
      ...ingredientsRecipes,
      ...ustensilsRecipes,
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
    const divMessage = document.createElement("div");
    const message = document.createElement("p");
    message.textContent =
      'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
    message.classList.add("error");
    divMessage.appendChild(message);
    section.appendChild(divMessage);
  } else {
    new Dropdown(filteredRecipes);
    displayRecipes(filteredRecipes); // actualise l'interface
  }
}

// Afficher toutes les recettes initialement
new Dropdown(recipes);

displayRecipes(recipes);
