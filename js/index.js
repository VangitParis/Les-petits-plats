import { recipes } from "./mocks/recipes.js";
import { FilterRecipesWithLoop } from "./algorithms/algorithmSearchBar.js";
import { Dropdown } from "./classes/Dropdowns.js";
import { removeDiacritics } from "./utils/utils.js";
import { displayRecipes } from "./template/recipeCards.js";

let filterUniqueRecipes = [];

// Fonction qui gère la recherche et le filtre des recettes
function handleSearch() {
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
  filterUniqueRecipes = [
    ...new Set([...filteredRecipesByText, ...filteredRecipesByKeyword]),
  ];
  const sectionDiv = document.getElementById("cardsContainer");

  sectionDiv.innerHTML = "";
  // si un tag est déjà sélectionné
  const selectedTags = Array.from(
    document.getElementsByClassName("selected")
  ).map((tag) => removeDiacritics(tag.textContent).toLowerCase());

  if (filterUniqueRecipes.length === 0) {
    const divMessage = document.createElement("div");
    const message = document.createElement("p");
    message.textContent =
      'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
    message.classList.add("error");
    divMessage.appendChild(message);
    sectionDiv.appendChild(divMessage);
  } else if (selectedTags) {
    applyFilterByTags(selectedTags);
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
  const dropdown = new Dropdown(recipes); // on appelle le tableau filtré en paramètre
  dropdown.specifiesSearch();
  const sectionDiv = document.getElementById("cardsContainer");

  //Afficher les recettes filtrées
  sectionDiv.innerHTML = "";

  // Vérifier si les recettes sont déjà filtrées
  if (filterUniqueRecipes.length > 0) {
    const dropdown = new Dropdown(filterUniqueRecipes);
    dropdown.specifiesSearch();
    const newFilteredRecipes = dropdown.filterRecipes();
    if (newFilteredRecipes.length === 0) {
      const divMessage = document.createElement("div");
      const message = document.createElement("p");
      message.textContent =
        'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
      message.classList.add("error");
      divMessage.appendChild(message);
      sectionDiv.appendChild(divMessage);
    }
    displayRecipes(newFilteredRecipes); // actualise l'interface avec les nouvelles recettes filtrées
    return;
  }
}

advancedSearchInputs.forEach((advancedSearchInput) => {
  advancedSearchInput.addEventListener("input", function () {
    advancedSearch(advancedSearchInput.value);
  });
  advancedSearchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      advancedSearch(advancedSearchInput.value);
    }
  });
});

export function applyFilterByTags() {
  // Récupérer les tags sélectionnés
  const selectedTags = Array.from(
    document.getElementsByClassName("selected")
  ).map((tag) => removeDiacritics(tag.textContent).toLowerCase());
  let recipesToFilter =
    filterUniqueRecipes.length === 0 ? recipes : filterUniqueRecipes;

  // Filtrer les recettes qui correspondent aux tags sélectionnés après filtrage
  const filteredRecipes = recipesToFilter.filter((recipe) => {
    // Vérifier si tous les tags sélectionnés sont présents dans les ingrédients, appareils et ustensiles de la recette
    const ingredientsRecipes = recipe.ingredients.map((ingredient) =>
      removeDiacritics(ingredient.ingredient.toLowerCase())
    );
    const applianceRecipe = removeDiacritics(recipe.appliance.toLowerCase());
    const ustensilsRecipes = recipe.ustensils.map((ustensil) =>
      removeDiacritics(ustensil.toLowerCase())
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
  const sectionDiv = document.getElementById("cardsContainer");

  sectionDiv.innerHTML = "";

  //Afficher message d'erreur si recettes ne correspondent pas

  if (filteredRecipes.length === 0) {
    const divMessage = document.createElement("div");
    const message = document.createElement("p");
    message.textContent =
      'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
    message.classList.add("error");
    divMessage.appendChild(message);
    sectionDiv.appendChild(divMessage);
  } else {
    new Dropdown(filteredRecipes);
    displayRecipes(filteredRecipes); // actualise l'interface
  }
}

// Afficher toutes les recettes initialement
new Dropdown(recipes);
displayRecipes(recipes);
