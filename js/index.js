import { recipes } from "./mock/recipes.js";
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

function manageAdvancedSearch() {
  const searchInputIngredients = document.getElementById(
    "inputSearchIngredients"
  );
  const searchText = searchInputIngredients.value.toLowerCase().trim();

 
}

//Ajouter un évènement de saisie sur la la recherche avancée
const advancedSearchIngredients = document.getElementById(
  "inputSearchIngredients"
);
advancedSearchIngredients.addEventListener("input", manageAdvancedSearch);
// Afficher toutes les recettes initialement
new Dropdown(recipes);
displayRecipes(recipes);

