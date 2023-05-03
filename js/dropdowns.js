import { recipes } from "./mock/recipes.js";
import { Tags } from "./tags.js";
import { removeDiacritics } from "./utils.js";

export class Dropdown {
  constructor(recipes, searchText = "") {
    this.recipes = recipes;
    this.searchText = searchText;
  
    this.ingredient = [];
    this.appliance = [];
    this.ustensil = [];

    this.buttonGroupIngredients = document.getElementsByClassName(
      "btn-group ingredients"
    )[0];
    this.buttonGroupAppliances = document.getElementsByClassName(
      "btn-group appliances"
    )[0];
    this.buttonGroupUstensils = document.getElementsByClassName(
      "btn-group ustensils"
    )[0];

    this.ingredientsList = document.getElementById("ingredientsList");
    this.appliancesList = document.getElementById("appliancesList");
    this.ustensilsList = document.getElementById("ustensilsList");

    this.dropdownMenu = document.querySelectorAll(".dropdown-menu");
    this.dropdownMenuIngredients = document.getElementsByClassName(
      "dropdown-ingredients"
    )[0];
    this.dropdownMenuAppliances = document.getElementsByClassName(
      "dropdown-appliances"
    )[0];
    this.dropdownMenuUstensils =
      document.getElementsByClassName("dropdown-ustensils")[0];

    this.searchIngredients = document.getElementById("inputSearchIngredients");
    this.searchAppliances = document.getElementById("inputSearchAppliances");
    this.searchUstensils = document.getElementById("inputSearchUstensils");

    this.addDropdownButtonListener();
    this.searchObjectInDropdown();
    this.closeDropdown();
  }

  addDropdownButtonListener() {
    this.buttonGroupIngredients.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonGroupIngredients.classList.toggle("active");

      if (this.buttonGroupIngredients.classList.contains("active")) {
        const dropdownMenu = document.getElementsByClassName(
          "dropdown-ingredients"
        )[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.getIngredients();
      }
    });

    this.buttonGroupAppliances.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonGroupAppliances.classList.toggle("active");

      if (this.buttonGroupAppliances.classList.contains("active")) {
        const dropdownMenu = document.getElementsByClassName(
          "dropdown-appliances"
        )[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'appareils
        this.getAppliances();
        
      }
    });

    this.buttonGroupUstensils.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonGroupUstensils.classList.toggle("active");

      
      if (this.buttonGroupUstensils.classList.contains("active")) {
        const dropdownMenu =
          document.getElementsByClassName("dropdown-ustensils")[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.getUstensils();
       
      }
    });
  }
  createListItem(list, text, className) {
    // Ne pas afficher l'ingrédient de la liste si il est deja sélectionné dans les tags
    // Vérifier si l'ingrédient existe déjà dans les tags
    // Vérifier si l'élément existe déjà dans la liste
    const existingTag = document.getElementById(`tag-id-${text}`);
    if (existingTag) {
      return;
    }
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    const link = document.createElement("a");
    link.classList.add("list-group-item", className);
    link.innerText = text;
    // Ajouter un événement de clic à chaque lien de tag pour filtrer les recettes
    link.addEventListener("click", (e) => {
      e.preventDefault();
      this.filterRecipes(text);
    });
    // Ajouter l'élément de liste à la liste
    list.appendChild(listItem);
    listItem.appendChild(link);
  }

  getIngredients() {
    // Récupérer tous les ingrédients à partir des recettes filtrées
    const allIngredients = this.recipes.reduce((acc, recipe) => {
      let recipeIngredients = recipe.ingredients.map((item) =>
        item.ingredient.toLowerCase()
      );

      return acc.concat(recipeIngredients);
    }, []);

    // Filtrer les ingrédients en double et les rendre uniques
    const uniqueIngredients = [...new Set(allIngredients)];

    // Effacer la liste existante d'ingrédients
    this.ingredientsList.innerHTML = "";

    // Mettre la première lettre de chaque ingrédient en majuscule
    let capitalizedIngredients = uniqueIngredients.map((ingredient) => {
      return ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
    });

    // Créer un élément de liste pour chaque ingrédient
    capitalizedIngredients.forEach((capitalizedIngredient) => {
      this.createListItem(
        this.ingredientsList,
        capitalizedIngredient,
        "tag-ingredient"
      );
    });

    const tagLinks = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const addTags = new Tags(tagLinks, this.recipes);
    addTags.displayTags();
  }

  getAppliances() {
    // Récupérer tous les appareils à partir des recettes

    const allAppliances = this.recipes.reduce((acc, recipe) => {
      return acc.concat(recipe.appliance.toLowerCase());
    }, []);

    // Filtrer les appareils en double et les rendre uniques
    this.uniqueAppliances = [...new Set(allAppliances)];

    // Effacer la liste existante d'appareils
    this.appliancesList.innerHTML = "";

    // Mettre la première lettre de chaque appareil en majuscule
    let capitalizedAppliances = this.uniqueAppliances.map((appliance) => {
      return appliance.charAt(0).toUpperCase() + appliance.slice(1);
    });

    // Créer un élément de liste pour chaque appareil
    capitalizedAppliances.forEach((capitalizedAppliance) => {
      // Vérifier si l'ingrédient existe déjà dans les tags
      this.createListItem(
        this.appliancesList,
        capitalizedAppliance,
        "tag-appliance"
      );
    });
    const tagLinks = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const addTags = new Tags(tagLinks, this.recipes);
    addTags.displayTags();
  }
  getUstensils() {
    // Récupérer tous les ustensiles à partir des recettes
    const allUstensils = this.recipes.reduce((acc, recipe) => {
      let recipeUstensils = recipe.ustensils.map((item) => item.toLowerCase());

      return acc.concat(recipeUstensils);
    }, []);

    // Filtrer les ustensiles en double et les rendre uniques
    this.uniqueUstensils = [...new Set(allUstensils)];

    // Effacer la liste existante d'ustensiles
    this.ustensilsList.innerHTML = "";

    // Mettre la première lettre de chaque ustensile en majuscule
    let capitalizedUstensils = this.uniqueUstensils.map((ustensil) => {
      return ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
    });

    // Créer un élément de liste pour chaque ustensile
    capitalizedUstensils.forEach((capitalizedUstensil) => {
      // Vérifier si l'ingrédient existe déjà dans les tags
      this.createListItem(
        this.ustensilsList,
        capitalizedUstensil,
        "tag-ustensil"
      );
    });
    const tagLinks = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const addTag = new Tags(tagLinks, this.recipes);
    addTag.displayTags(this.recipes);
  }
  // Fonction de filtrage des recettes en fonction des ingrédients sélectionnés
  filterRecipes() {
    const filteredRecipes = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      //Vérifier qu'un ingrédient match avec la saisie de recherche
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient
          .toLowerCase()
          .includes(this.searchIngredients.value.toLowerCase())
      );

      //Vérifier qu'un appareil match avec la saisie de recherche
      const applianceMatch = recipe.appliance
        .toLowerCase()
        .includes(this.searchAppliances.value.toLowerCase());

      //Vérifier qu'un ustensile match avec la saisie de recherche
      const ustensilMatch = recipe.ustensils.some((ustensil) =>
        ustensil
          .toLowerCase()
          .includes(this.searchUstensils.value.toLowerCase())
      );

      // si tout correspond on affiche les recettes filtrées
      if (ingredientMatch && applianceMatch && ustensilMatch) {
        filteredRecipes.push(recipe);
     
      }
    
    }

    return filteredRecipes;
  }

  // On met à jour les listes pour la recherche des ingrédients, appareils ou ustensils
  updateFilteredList(list) {
    const searchTerm = list.searchInput.value.trim().toLowerCase();

    // on vide la liste dès 3 caractères saisis dans le champ
    if (searchTerm.length < 3) {
      return;
    }

    // Recherche d'ingrédients avec ou sans accents
    const normalizedSearchTerm = removeDiacritics(searchTerm.toLowerCase());

    // Attention particulière à la saisie des pluriels
    const pluralSearchTerm = normalizedSearchTerm.endsWith("s");
    const searchTermWithoutPlural = pluralSearchTerm
      ? normalizedSearchTerm.slice(0, -1)
      : normalizedSearchTerm;

    // Stockage des ingrédients filtrés uniques dans un objet Set
    const uniqueItems = new Set();
    recipes.forEach((recipe) => {
      if (list.property === "appliance") {
        let itemName = removeDiacritics(recipe[list.property]).toLowerCase();
        const itemWithoutPlural = itemName.endsWith("s")
          ? itemName.slice(0, -1)
          : itemName;
        if (itemName.includes(searchTermWithoutPlural)) {
          uniqueItems.add(itemName);
        }
      } else {
        recipe[list.property].forEach((item) => {
          let itemName;
          if (list.property === "ingredients") {
            itemName = removeDiacritics(item[list.argument]).toLowerCase();
          } else {
            itemName = removeDiacritics(item).toLowerCase();
          }
          const itemWithoutPlural = itemName.endsWith("s")
            ? itemName.slice(0, -1)
            : itemName;
          if (itemName.includes(searchTermWithoutPlural)) {
            uniqueItems.add(itemName);
          }
        });
      }
    });

    // Conversion de l'objet Set en tableau pour l'affichage
    const uniqueItemsArray = Array.from(uniqueItems);

    // Vider la liste existante d'ingrédients
    list.list.innerHTML = "";

    // Créer les éléments HTML pour chaque ingrédient filtré
    uniqueItemsArray.forEach((item) => {
      const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
      this.createListItem(list.list, capitalizedItem, list.tagClass);

      // Afficher les ingrédients filtrés
      return uniqueItemsArray;
    });

    const tagLinks = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const addTag = new Tags(tagLinks, this.recipes);
    addTag.displayTags(uniqueItemsArray);
  }

  searchObjectInDropdown() {
    const ingredientFilter = this.updateFilteredList({
      list: this.ingredientsList,
      searchInput: this.searchIngredients,
      property: "ingredients",
      argument: "ingredient",
      tagClass: "tag-ingredient",
    });

    const applianceFilter = this.updateFilteredList({
      list: this.appliancesList,
      searchInput: this.searchAppliances,
      property: "appliance",
      tagClass: "tag-appliance",
    });

    const ustensilFilter = this.updateFilteredList({
      list: this.ustensilsList,
      searchInput: this.searchUstensils,
      property: "ustensils",
      tagClass: "tag-ustensil",
    });

    // modifier la hauteur et la taille de la dropdown quand on saisi une recherche
    // this.dropdownMenuIngredients.classList.add("dropdown-sm-size");
    // this.searchIngredients.classList.add("input-resize");
    // const arrowUp = document.getElementsByClassName("arrow-up")[0];
    // arrowUp.classList.add("arrow-up-resize");
    // const section = document.getElementsByClassName("dropdown")[0];
    // section.classList.add("mb-4");
    // if (this.buttonGroupIngredients.classList.contains("active")) {
    //   this.buttonGroupAppliances.style.marginLeft = "2.4rem";
    // } else if ((this.buttonGroupAppliances.style.marginLeft = "2.4rem")) {
    //   this.buttonGroupAppliances.style.marginLeft = "0rem";
    // }
  }
  // Met à jour les listes en fonctions des sélections dans les autres listes
  updateFilters() {
    const ingredientFilters = Array.from(
      this.ingredientsList.getElementsByClassName("tag-ingredient")
    );
    const applianceFilters = Array.from(
      this.appliancesList.getElementsByClassName("tag-appliance")
    );
    const ustensilFilters = Array.from(
      this.ustensilsList.getElementsByClassName("tag-ustensil")
    );
    const searchTerms = [
      ...ingredientFilters,
      ...applianceFilters,
      ...ustensilFilters,
    ].map((filter) => filter.textContent.trim().toLowerCase());
    

    const filteredRecipes = this.filterRecipes(searchTerms);
  }

  // Ajouter un écouteur d'événement pour chaque bouton de la dropdown et la fermer
  closeDropdown() {
    const toggleMenus = (menu) => {
      this.dropdownMenuIngredients.style.display =
        menu === "ingredients" ? "block" : "none";
      this.dropdownMenuAppliances.style.display =
        menu === "appliances" ? "block" : "none";
      this.dropdownMenuUstensils.style.display =
        menu === "ustensils" ? "block" : "none";
    };

    // Si on clique sur une autre dropdown on enlève la classe "active" pour afficher que celle qui est cliquée
    this.buttonGroupIngredients.addEventListener("click", () => {
      toggleMenus("ingredients");
      this.buttonGroupIngredients.classList.add("active");

      this.buttonGroupAppliances.classList.remove("active");

      this.buttonGroupUstensils.classList.remove("active");
      this.searchObjectInDropdown();
    });

    this.buttonGroupAppliances.addEventListener("click", () => {
      toggleMenus("appliances");
      this.buttonGroupAppliances.classList.add("active");

      this.buttonGroupIngredients.classList.remove("active");
      this.buttonGroupUstensils.classList.remove("active");
    });

    this.buttonGroupUstensils.addEventListener("click", () => {
      toggleMenus("ustensils");
      this.buttonGroupUstensils.classList.add("active");
      this.buttonGroupIngredients.classList.remove("active");
      this.buttonGroupAppliances.classList.remove("active");
    });

    // Ajouter un écouteur d'événement pour fermer la dropdown affichée
    document.addEventListener("click", (e) => {
      //seulement si on ne clique pas sur dropdown-toggle ou dans le champ des input des dropdowns
      if (!e.target.matches(".dropdown-toggle")) {
        if (
          e.target.matches("#inputSearchIngredients") ||
          e.target.matches("#inputSearchAppliances") ||
          e.target.matches("#inputSearchUstensils")
        ) {
          return;
        }
        this.buttonGroupIngredients.classList.remove("active");

        this.buttonGroupAppliances.classList.remove("active");
        this.buttonGroupUstensils.classList.remove("active");
        this.dropdownMenu.forEach((menu) => {
          if (menu.style.display === "block") {
            menu.style.display = "none";
          }
        });
      }
    });
  }
}
