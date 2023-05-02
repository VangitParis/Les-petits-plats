import { recipes } from "./mock/recipes.js";

import { FilterRecipesWithFilter } from "./algorithmSearchBar.js";

import { Dropdown } from "./Dropdowns.js";

const main = document.getElementById("main");
const section = document.getElementById("cards");

// Fonction qui affiche toutes les recettes
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const article = `
        <article class="container col-sm-4 col-lg-4 card-group">
            <figure class="figure">
                <img class="card-img-top figure-img src="${
                  recipe.image
                }" alt="">
                <figcaption class="figure-caption">
                    <div class="card-title d-flex bd-highlight align-items-center ">
                        <h3 class="me-auto p-2 flex-grow-1 bd-highlight text-truncate">${
                          recipe.name
                        }</h3>
                        <div class="d-flex p-2 bd-highlight align-items-center">
                            <img class="img-icon-card" src="../assets/clock.svg" alt=""></img> 
                            <p class="mb-0">${recipe.time} min</p>
                        </div>
                    </div>
                    <div class="d-flex card-text align-top mb-3 d-inline-block h-50">
                    <ul>
                    ${recipe.ingredients
                      .map(
                        (ingredient) => `
                        <li class="list-group-item">
                            <strong>${ingredient.ingredient}</strong>
                            ${
                              ingredient.quantity
                                ? `: ${ingredient.quantity}${
                                    ingredient.unit
                                      ? " " +
                                        (ingredient.unit === "grammes"
                                          ? "g"
                                          : ingredient.unit === "litres"
                                          ? "L"
                                          : ingredient.unit ===
                                            "cuillères à soupe"
                                          ? "c. à soupe"
                                          : ingredient.unit)
                                      : ""
                                  }`
                                : ""
                            }
                        </li>
                    `
                      )
                      .join("")}
                </ul>
                        <p class="contain-content card-text-recipe">${
                          recipe.description
                        }</p>
                    </div>
                </figcaption>
            </figure>
        </article>
        `;
    section.innerHTML += `${article}`;
    main.appendChild(section);
  });
}

// Fonction qui gère la recherche et le filtre des recettes
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.toLowerCase().trim();
  const filterInSearchBar = new FilterRecipesWithFilter(recipes, searchText);
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
    displayRecipes(filterUniqueRecipes);
   
  }
}
// Ajouter un événement de saisie sur la barre de recherche
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
searchInput.addEventListener("input", handleSearch);
searchButton.addEventListener("click", handleSearch);

// Afficher toutes les recettes initialement
new Dropdown(recipes);
//Ajouter un évènement de saisie sur la la recherche avancée
const advancedSearchInputs = Array.from(
  document.getElementsByClassName("form-control")
);

function searchHandler() {
  const searchText = this.value.toLowerCase().trim();
  const dropdown = new Dropdown(recipes, searchText);
  dropdown.searchObjectInDropdown();
  const filterRecipes = dropdown.filterRecipes();
  const updateFilters = dropdown.updateFilters();
  
  section.innerHTML = "";
  displayRecipes(filterRecipes, updateFilters);
}

advancedSearchInputs.forEach((advancedSearch) => {
  advancedSearch.addEventListener("input", searchHandler);
});

// Afficher toutes les recettes initialement
new Dropdown(recipes);

displayRecipes(recipes);
