
const main = document.getElementById("main");
const section = document.getElementById("cards");
const sectionDiv = document.createElement("div");
sectionDiv.id = "cardsContainer";
sectionDiv.classList.add( "col-sm-12", "col-lg-12", "col-md-12", "card-group", "justify-content-start", "align-items-start");
// Fonction qui affiche toutes les recettes
export function displayRecipes(recipes) {
  recipes.forEach((recipe) => {

    const article = `
        <article class="card">
            <figure class="figure">
                <img class="card-img-top figure-img" src="/assets/photos/${recipe.image}" alt="">
                <figcaption class="figure-caption">
                    <div class="card-title-time d-flex bd-highlight align-items-center">
                        <h3 class="me-auto p-2 flex-grow-1 bd-highlight text-truncate card-title">${
                          recipe.name
                        }</h3>
                        <div class="d-flex p-2 bd-highlight align-items-center card-time">
                            <img class="img-icon-card" src="../assets/clock.svg" alt=""></img> 
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
    sectionDiv.innerHTML += `${ article }`;
    section.appendChild(sectionDiv);
    main.appendChild(section);
  });
}
