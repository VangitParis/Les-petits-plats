import { recipes } from "./recipes.js";

async function displayRecipes() {
    const main = document.getElementById("main");
    const section = document.createElement("section");
    section.classList.add("container", "row");
    // section.setAttribute("style", "--bs-gap: .25rem 1rem; --bs-columns:3;")
    
    recipes.forEach(recipe => {
        const article = `
        <article class="container col-sm-4 col-lg-4 card-group">
            <figure class="card">
                <img class="card-img-top article_img" >
                <figcaption class="card-body col">
                    <div class="flex-between">
                    <h2 class="card-title">${ recipe.name }</h2>
                    <div class="container">
                        <img src="../assets/clock.svg" alt=""></img> 
                        <p class="card-text">${ recipe.time } min</p>
                    </div>
                    </div>
                    <div class="col flex-around">
                    <ul "col list-group list-group-flush ">
                        ${ recipe.ingredients.map(ingredient => `<li "list-group-item">${ ingredient.ingredient }</li>`).join("") }
                    </ul>
                    <p class="card-text">${ recipe.description }</p>
                    </div>
                    <p class="card-text">Pour ${ recipe.servings } personne(s)</p>
                </figcaption>
            </figure>
        </article>
        `
        section.innerHTML += `${ article }`;
        main.appendChild(section)

       
    });
}
displayRecipes();
