// creation de la section contenant les boutons dropdowns
export function createButtons(recipes) {
  const main = document.getElementById("main");
  const section = document.createElement("section");
  section.classList.add("container", "dropdown", "row");

  // Créer le bouton pour les ingrédients
  const ingredientsTagsButton = document.createElement("button");
  ingredientsTagsButton.classList.add(
    "btn",
    "btn-primary",
    "mt-4",
    "dropdown-toggle",
    "ingredients-tags",
    "d-flex"
  );
  ingredientsTagsButton.id = "updateDropdownMenuButton1";
  ingredientsTagsButton.setAttribute("type", "button");
  ingredientsTagsButton.setAttribute("data-toggle", "dropdown");
  ingredientsTagsButton.ariaExpanded = "false";

  const buttonText = document.createElement("span");
  buttonText.textContent = "Ingrédients";

  const arrowDown = document.createElement("img");
  arrowDown.setAttribute("src", "../assets/arrowbtn.svg");
  arrowDown.alt = "";
  arrowDown.classList.add("arrow-down");

  ingredientsTagsButton.appendChild(buttonText);
  ingredientsTagsButton.appendChild(arrowDown);

  // Créer le bouton pour les appareils
  const appliancesTagsButton = document.createElement("button");
  appliancesTagsButton.classList.add(
    "btn",
    "btn-primary",
    "mt-4",
    "dropdown-toggle",
    "appliances-tags"
  );
  appliancesTagsButton.id = "updateDropdownMenuButton2";
  appliancesTagsButton.setAttribute("type", "button");
  appliancesTagsButton.textContent = "Appareils";
  appliancesTagsButton.setAttribute("data-toggle", "dropdown");
  appliancesTagsButton.ariaExpanded = "false";

  // Créer le bouton pour les ustensiles
  const ustensilsTagsButton = document.createElement("button");
  ustensilsTagsButton.classList.add(
    "btn",
    "btn-primary",
    "mt-4",
    "dropdown-toggle",
    "ustensils-tags"
  );
  ustensilsTagsButton.id = "updateDropdownMenuButton3";
  ustensilsTagsButton.setAttribute("type", "button");
  ustensilsTagsButton.textContent = "Ustensiles";

  const dropdownMenu = document.createElement("div");
  dropdownMenu.classList.add("dropdown-menu");

  const divForm = document.createElement("div");
  divForm.classList.add("form-group", "mx-sm-3", "mb-2");

  const ingredientList = document.createElement("div");
  ingredientList.classList.add("ingredients-list");

  ingredientsTagsButton.appendChild(dropdownMenu);
  dropdownMenu.appendChild(divForm);
  dropdownMenu.appendChild(ingredientList);

  main.appendChild(section);
  section.appendChild(ingredientsTagsButton);
  section.appendChild(appliancesTagsButton);
  section.appendChild(ustensilsTagsButton);

  // Ajouter des écouteurs d'événements pour afficher/masquer les listes déroulantes
  ingredientsTagsButton.addEventListener("click", function (e) {
    e.preventDefault();
    ingredientsTagsButton.classList.toggle("active");

    //modifie le style des boutons ustensiles et appareils pour qu'il se décalent à droite
    if (ingredientsTagsButton.classList.contains("active")) {
      dropdownMenu.style.display = "none"
        ? (dropdownMenu.style.display = "block")
        : (dropdownMenu.style.display = "none");
      createSearchFormInDropdown(); // ouvre la recherche
      createDropdownIngredients(recipes); // ouvre list-group = ul

      appliancesTagsButton.style.left = "39%";
      ustensilsTagsButton.style.left = "39%";
    } else {
      appliancesTagsButton.style.left = "0";
      ustensilsTagsButton.style.left = "0";
    }
  });
  appliancesTagsButton.addEventListener("click", () => {
    appliancesTagsButton.classList.toggle("active");
  });

  ustensilsTagsButton.addEventListener("click", () => {
    ustensilsTagsButton.classList.toggle("active");
  });
}

// creation du formulaire de recherche dans la dropdown
function createSearchFormInDropdown() {
  const divForm = document.getElementsByClassName("form-group")[0];
  const searchForm = document.createElement("form");

  searchForm.classList.add("form-inline", "dropdown-form");

  const labelSearch = document.createElement("label");
  labelSearch.setAttribute("for", "inputSearch");

  const inputSearch = document.createElement("input");
  inputSearch.placeholder = "Rechercher un ingrédient";

  const arrowUp = document.createElement("img");
  arrowUp.setAttribute("src", "../assets/arrowbtn.svg");
  arrowUp.classList.add("arrow-up");
  arrowUp.alt = "";

  inputSearch.classList.add("form-control");
  inputSearch.setAttribute("type", "text");
  inputSearch.ariaLabel = "Rechercher un ingrédient";
  inputSearch.id = "inputSearch";

  divForm.appendChild(labelSearch);
  divForm.appendChild(inputSearch);
  divForm.appendChild(arrowUp);
}

// creation de la dropdown Ingrédients
function createDropdownIngredients(recipes) {
  const ingredientList = document.getElementsByClassName("ingredients-list")[0];
  const tagsGroupList = document.createElement("ul");

  tagsGroupList.classList.add("list-group");
  tagsGroupList.setAttribute("aria-labelledby", "updateDropdownMenuButton");

  ingredientList.appendChild(tagsGroupList);

  createTagsIngredients(recipes);
}

// Création des éléments contenu dans la dropdown Ingrédients
function createTagsIngredients(recipes) {
  const tagsGroupList = document.getElementsByClassName("list-group")[0];
  tagsGroupList.style.display = "none"
    ? (tagsGroupList.style.display = "flex")
    : (tagsGroupList.style.display = "none");
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.classList.add("list-group-item");
      link.href = "#";
      link.textContent = ingredient.ingredient;
      listItem.appendChild(link);
      tagsGroupList.appendChild(listItem);
    });
  });

  //Fermer la dropdown
  const ingredientsTagsButton = document.getElementById(
    "updateDropdownMenuButton1"
  );
  ingredientsTagsButton.addEventListener("click", () => {
    if (!ingredientsTagsButton.classList.contains("active")) {
      const tagsGroupList = document.getElementsByClassName("list-group")[0];
      tagsGroupList.style.display = "none";

      ingredientsTagsButton.classList.remove("active");
      createSearchFormInDropdown();
    }
  });
}
