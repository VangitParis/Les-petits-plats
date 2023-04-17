import { recipes } from "./mock/recipes.js";
import { FilterRecipes } from "./algorithmSearchBar.js";
import { Dropdown } from "./Dropdowns.js";



const main = document.getElementById("main");
const section = document.getElementById("cards");

// Fonction qui affiche toutes les recettes
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const article = `
        <article class="container col-sm-4 col-lg-4 card-group">
            <figure class="figure">
                <img class="card-img-top figure-img" >
                <figcaption class="figure-caption">
                    <div class="card-title d-flex bd-highlight align-items-center ">
                        <h3 class="me-auto p-2 flex-grow-1 bd-highlight text-truncate">${
                          recipe.name
                        }</h3>
                        <div class="d-flex p-2 bd-highlight align-items-center">
                            <img class="img-icon-card "src="../assets/clock.svg" alt=""></img> 
                            <p class="mb-0">${recipe.time} min</p>
                        </div>
                    </div>
                    <div class="d-flex card-text align-top mb-3 d-inline-block h-50">
                        <ul "list-group">
                            ${recipe.ingredients
                              .map(
                                (ingredient) => `
                            <li class="list-group-item">
                            <strong>${ingredient.ingredient}</strong>
                            ${
                              ingredient.quantity
                                ? ` : ${ingredient.quantity}
                            ${
                              ingredient.unit === "grammes"
                                ? "g"
                                : ingredient.unit === "litres"
                                ? "L"
                                : ingredient.unit === "cuillères à soupe"
                                ? "c. à soupe"
                                : ingredient.unit
                                ? ingredient.unit.replace(" ", "")
                                : ""
                            }`
                                : ""
                            }</li>`
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
  const filterInSearchBar = new FilterRecipes(recipes, searchText);
  const filteredRecipesByText = filterInSearchBar.filterRecipesByText(recipes,searchText);
  const filteredRecipesByKeyword = filterInSearchBar.filterRecipesByKeywords(recipes, searchText);
  

  // Fusionner les résultats des deux filtres en une seule liste de recettes uniques
  const uniqueRecipes = [
    ...new Set([...filteredRecipesByText, ...filteredRecipesByKeyword]),
  ];
  

  const section = document.getElementById("cards");
  section.innerHTML = "";

  if (uniqueRecipes.length === 0) {
    const divMessage = document.createElement("div");
    const message = document.createElement("p");
    message.textContent =
      'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc';
    message.classList.add("error");
    divMessage.appendChild(message);
    section.appendChild(divMessage);
  } else {
    displayRecipes(uniqueRecipes);
  }
}

// Ajouter un événement de saisie sur la barre de recherche
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
searchInput.addEventListener("input", handleSearch);
searchButton.addEventListener("submit", handleSearch);
// Afficher toutes les recettes initialement
new Dropdown(recipes);
const filterByTags = new Dropdown(recipes);
const tagsSearch = filterByTags.filterRecipes();
displayRecipes(recipes);

