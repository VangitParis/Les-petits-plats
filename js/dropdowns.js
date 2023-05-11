import { recipes } from "./mock/recipes.js";

import { Tags } from "./Tags.js";
import {
  removeDiacritics,
  createListItem,
  capitalizeArray,
  removeDuplicates,
  filterArray,
} from "./utils.js";

export class Dropdown {
  constructor(recipes, searchTerm = "", filterUniqueRecipes) {
    this.recipes = recipes;
    this.searchTerm = searchTerm;

    this.filterUniqueRecipes = filterUniqueRecipes;
    if (typeof searchTerm !== "string") {
      throw new Error("searchTerm doit être une string");
    }

    // Sélection des boutons de chaque groupe
    this.buttonGroupIngredients = document.getElementsByClassName(
      "btn-group ingredients"
    )[0];
    this.buttonGroupAppliances = document.getElementsByClassName(
      "btn-group appliances"
    )[0];
    this.buttonGroupUstensils = document.getElementsByClassName(
      "btn-group ustensils"
    )[0];
    // Création d'un tableau avec tous les boutons
    this.buttons = [
      this.buttonGroupIngredients,
      this.buttonGroupAppliances,
      this.buttonGroupUstensils,
    ];

    // Sélection des menus déroulants pour chaque type d'éléments (ingrédients, appareils, ustensiles)
    this.dropdownMenuIngredients = document.getElementsByClassName(
      "dropdown-ingredients"
    )[0];
    this.dropdownMenuAppliances = document.getElementsByClassName(
      "dropdown-appliances"
    )[0];
    this.dropdownMenuUstensils =
      document.getElementsByClassName("dropdown-ustensils")[0];
    // Création d'un tableau avec tous les menus déroulants
    this.dropdownMenu = [
      this.dropdownMenuIngredients,
      this.dropdownMenuAppliances,
      this.dropdownMenuUstensils,
    ];

    this.ingredientsList = document.getElementById("ingredientsList");
    this.appliancesList = document.getElementById("appliancesList");
    this.ustensilsList = document.getElementById("ustensilsList");

    this.searchIngredients = document.getElementById("inputSearchIngredients");
    this.searchAppliances = document.getElementById("inputSearchAppliances");
    this.searchUstensils = document.getElementById("inputSearchUstensils");
    this.searchInput = document.getElementById("searchInput");
    this.searchInputs = [
      this.searchIngredients,
      this.searchAppliances,
      this.searchUstensils,
      this.searchInput,
    ];

    this.openDropdown();
    this.closeDropdown();
  }

  //ajoute des EventsListeners pour ouvrir la dropdown sélectionnée au clic sur le bouton
  openDropdown() {
    const toggleMenus = (menu) => {
      this.dropdownMenuIngredients.style.display =
        menu === "ingredients" ? "block" : "none";
      this.dropdownMenuAppliances.style.display =
        menu === "appliances" ? "block" : "none";
      this.dropdownMenuUstensils.style.display =
        menu === "ustensils" ? "block" : "none";
    };
    // Si on appui sur touche Tab
    const openMenuFocus = () => {
      this.buttons.forEach((button, index) => {
        button.addEventListener("Enter", () => {
          toggleMenus(["ingredients", "appliances", "ustensils"][index]);
          this.buttons.forEach((b) => b.classList.remove("active"));
          button.classList.add("active");
        });
      });
    };
    // Si on clique sur une autre dropdown, on enlève la classe "active" pour afficher seulement celle qui est cliquée
    this.buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        toggleMenus(["ingredients", "appliances", "ustensils"][index]);
        this.buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      });
      openMenuFocus(button, index);
    });

    //affiche les elements de listes
    this.createListDropdown();
  }

  //ferme la dropdown si on clique n'importe où
  closeDropdown() {
    document.addEventListener("click", (e) => {
      // Seulement si on ne clique pas sur dropdown-toggle ou dans le champ des input des dropdowns
      if (!e.target.matches(".dropdown-toggle")) {
        if (
          e.target.matches("#inputSearchIngredients") ||
          e.target.matches("#inputSearchAppliances") ||
          e.target.matches("#inputSearchUstensils")
        ) {
          return;
        }

        this.buttons.forEach((b) => b.classList.remove("active"));
        this.dropdownMenu.forEach((menu) => {
          if (menu.style.display === "block") {
            menu.style.display = "none";
          }
        });
      }
    });
    // ferme la dropdown au clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.buttons.forEach((b) => b.classList.remove("active"));
        this.dropdownMenu.forEach((menu) => {
          if (menu.style.display === "block") {
            menu.style.display = "none";
          }
        });
      }
    });
  }

  // Création des listes originales sans filtres à l'ouverture des dropdowns
  createListDropdown(
    capitalizedIngredients,
    capitalizedAppliances,
    capitalizedUstensils
  ) {
    const allIngredients = recipes.reduce((acc, recipe) => {
      let recipeIngredients = recipe.ingredients.map((item) =>
        item.ingredient.toLowerCase()
      );
      return acc.concat(recipeIngredients);
    }, []);

    const allAppliances = recipes.reduce((acc, recipe) => {
      return acc.concat(recipe.appliance.toLowerCase());
    }, []);

    const allUstensils = recipes.reduce((acc, recipe) => {
      let recipeUstensils = recipe.ustensils.map((item) => item.toLowerCase());
      return acc.concat(recipeUstensils);
    }, []);

    const uniqueIngredients = removeDuplicates(allIngredients);
    const uniqueAppliances = removeDuplicates(allAppliances);
    const uniqueUstensils = removeDuplicates(allUstensils);

    capitalizedIngredients = capitalizeArray(uniqueIngredients);
    capitalizedAppliances = capitalizeArray(uniqueAppliances);
    capitalizedUstensils = capitalizeArray(uniqueUstensils);

    // Vider les listes existantes
    this.ingredientsList.innerHTML = " ";
    this.appliancesList.innerHTML = " ";
    this.ustensilsList.innerHTML = " ";

    // Créer un élément de liste pour chaque ingrédient
    capitalizedIngredients.forEach((capitalizedIngredient) => {
      createListItem(
        this.ingredientsList,
        capitalizedIngredient,
        "tag-ingredient"
      );
    });
    capitalizedAppliances.forEach((capitalizedAppliance) => {
      createListItem(
        this.appliancesList,
        capitalizedAppliance,
        "tag-appliance"
      );
    });
    capitalizedUstensils.forEach((capitalizedUstensil) => {
      createListItem(this.ustensilsList, capitalizedUstensil, "tag-ustensil");
    });
    // capitalizedUstensils.forEach((capitalizedUstensil, index) => {
    //   console.log(`Element qui a l'index ${index}: ${capitalizedUstensil}`);
    // });

    //Appelle la fonction qui ajoute les tags à la section
    this.addTagsInSectionTag();
  }

  // Filtre les recettes
  filterRecipes() {
    const filteredRecipes = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      //Vérifier qu'un ingrédient match avec la saisie de recherche
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient
          .toLowerCase()
          .includes(
            this.searchIngredients.value.toLowerCase() ||
              this.searchInput.value.toLowerCase()
          )
      );

      //Vérifier qu'un appareil match avec la saisie de recherche
      const applianceMatch =
        recipe.appliance
          .toLowerCase()
          .includes(this.searchAppliances.value.toLowerCase()) ||
        this.searchInput.value.toLowerCase();

      //Vérifier qu'un ustensile match avec la saisie de recherche
      const ustensilMatch = recipe.ustensils.some(
        (ustensil) =>
          ustensil
            .toLowerCase()
            .includes(this.searchUstensils.value.toLowerCase()) ||
          this.searchInput.value.toLowerCase()
      );

      // si tout correspond on affiche les recettes filtrées
      if (ingredientMatch && applianceMatch && ustensilMatch) {
        filteredRecipes.push(recipe);
      }
    }
    //Mettre à jour la liste des recettes filtrées
    return filteredRecipes;
  }
  //utilisateur précise sa recherche dans la recherche avancée des dropdowns
  specifiesSearch(searchTerm) {
    // Mise à jour de la liste des ingrédients
    this.filterList({
      list: this.ingredientsList,
      searchCurrentInput: this.searchIngredients,
      property: "ingredients",
      object: "ingredient",
      tagClass: "tag-ingredient",
    });

    // Mise à jour de la liste des appareils
    this.filterList({
      list: this.appliancesList,
      searchCurrentInput: this.searchAppliances,
      property: "appliance",
      tagClass: "tag-appliance",
    });

    // Mise à jour de la liste des ustensiles
    this.filterList({
      list: this.ustensilsList,
      searchCurrentInput: this.searchUstensils,
      property: "ustensils",
      tagClass: "tag-ustensil",
    });
  }
  // les résultats de recherche sont actualisés ainsi que les éléments disponibles dans les dropdowns
  filterList(list, searchTerm) {
    // si on saisi une recherche dans les dropdowns
    searchTerm = list.searchCurrentInput.value.trim().toLowerCase();
    let ingredientsList = [];
    let appliancesList = [];
    let ustensilsList = [];
    // on vide la liste dès 3 caractères saisis dans le champ
    if (searchTerm.length < 3) {
      return;
    }

    // créer un tableau vide pour stocker les éléments filtrés et les rendre unique
    let arrayWithFilteredElements = [];
    // Recherche d'ingrédients avec ou sans accents
    const normalizedSearchTerm = removeDiacritics(searchTerm);

    // Attention particulière à la saisie des pluriels
    const pluralSearchTerm = normalizedSearchTerm.endsWith("s");
    const searchTermWithoutPlural = pluralSearchTerm
      ? normalizedSearchTerm.slice(0, -1)
      : normalizedSearchTerm;

    // Stockage des éléments filtrés uniques dans un objet Set
    const uniqueItems = new Set();
    recipes.forEach((recipe, index) => {
      let itemName;
      if (list.property === "appliance") {
        itemName = recipe[list.property];
        const normalizedItemName = removeDiacritics(itemName).toLowerCase();
        itemName.endsWith("s") ? itemName.slice(0, -1) : itemName;
    
        if (normalizedItemName.includes(searchTermWithoutPlural)) {
          uniqueItems.add(itemName.toLowerCase());
         
        }
      } else {
        recipe[list.property].forEach((item) => {
          if (list.property === "ingredients") {
            itemName = item[list.object];
          } else {
            itemName = item;
          }
          const normalizedItemName = removeDiacritics(itemName).toLowerCase();
          itemName.endsWith("s") ? itemName.slice(0, -1) : itemName;
          if (normalizedItemName.includes(searchTermWithoutPlural)) {
            uniqueItems.add(itemName.toLowerCase());
         
          }
        });
      }
    });
    
    // Vider la liste existante
    list.list.innerHTML = '';
 
    // Créer les éléments HTML pour chaque élément filtré
    uniqueItems.forEach((item) => {
      const capitalizeItem = item.charAt(0).toUpperCase() + item.slice(1);
      // créer la liste filtrée avec juste le terme recherché
      createListItem(list.list, capitalizeItem, list.tagClass);
      this.addTagsInSectionTag();
    });
    
  }
  updateFiltersInDropdown() {
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
    ].map((filter) => filter.textContent.trim());

    console.info(searchTerms);

    return searchTerms;
  }

  addTagsInSectionTag() {
    const tagLinks = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    new Tags(tagLinks, this.recipes);
  }
}
