import { Tags } from "./tags.js";
import { normalize } from "./utils.js";
import { FilterRecipesWithLoop } from "./algorithmSearchBar.js";

export class Dropdown {
  constructor(recipes, filterUniqueRecipes) {
    this.recipes = recipes;
    this.filterUniqueRecipes = filterUniqueRecipes;

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
    this.searchIngredient = document.getElementById("inputSearchIngredients");
    this.searchAppliance = document.getElementById("inputSearchAppliance");
    this.searchUstensil = document.getElementById("inputSearchUstensils");

    this.addDropdownButtonListener();
    this.searchInDropdown();
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
      this.closeDropdown();
    });

    this.buttonGroupAppliances.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonGroupAppliances.classList.toggle("active");

      if (this.buttonGroupAppliances.classList.contains("active")) {
        const dropdownMenu = document.getElementsByClassName(
          "dropdown-appliances"
        )[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.getAppliances();
        this.searchInDropdown();
        this.closeDropdown();
      }
    });

    this.buttonGroupUstensils.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonGroupUstensils.classList.toggle("active");

      this.closeDropdown();
      if (this.buttonGroupUstensils.classList.contains("active")) {
        const dropdownMenu =
          document.getElementsByClassName("dropdown-ustensils")[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.searchInDropdown();
        this.getUstensils();
        this.filterRecipesByTags();
      }
    });
  }

  getIngredients() {
    // Récupérer tous les ingrédients à partir des recettes
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
      // Ne pas afficher l'ingrédient de la liste si il est deja sélectionné dans les tags

      // Vérifier si l'ingrédient existe déjà dans les tags
      const existingTag = document.getElementById(
        `tag-id-${capitalizedIngredient}`
      );
      if (existingTag) {
        return;
      } else {
        const recipeList = Array.from(
        document.getElementsByClassName("list-group-item")
      );
      //Créer un nouveau tag et l'ajouter a la section tags
      new Tags(recipeList, this.recipes);}
     
     // On peut créer et afficher la liste des ingrédients quand toutes les conditions sont vérifiées
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const link = document.createElement("a");
      link.classList.add("list-group-item", "tag-ingredient");
      link.innerText = capitalizedIngredient;

      // Ajouter l'élément de liste à la liste des ingrédients
      this.ingredientsList.appendChild(listItem);
      listItem.appendChild(link);
    });
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
      const existingTag = document.getElementById(
        `tag-id-${capitalizedAppliance}`
      );
      if (existingTag) {
        return;
      } else {
        const recipeList = Array.from(
          document.getElementsByClassName("list-group-item")
        );
        new Tags(recipeList, this.recipes);
      }
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const link = document.createElement("a");
      link.classList.add("list-group-item", "tag-appliance");
      link.innerText = capitalizedAppliance;

      // Ajouter l'élément de liste à la liste des appareils
      this.appliancesList.appendChild(listItem);
      listItem.appendChild(link);
    });
   
    
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
      const existingTag = document.getElementById(
        `tag-id-${capitalizedUstensil}`
      );
      if (existingTag) {
        return;
      } else {
        const recipeList = Array.from(
          document.getElementsByClassName("list-group-item")
        );
        new Tags(recipeList, this.recipes);
      }
      
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const link = document.createElement("a");
      link.classList.add("list-group-item", "tag-ustensil");
      link.innerText = capitalizedUstensil;

      // Ajouter l'élément de liste à la liste des ustensiles
      this.ustensilsList.appendChild(listItem);
      listItem.appendChild(link);
    });
   
   
  }

  // Fonction de filtrage des recettes en fonction des ingrédients sélectionnés
  filterRecipesByTags() {
    const filteredRecipes = [];
    // console.log(recipes);
    for (let i = 0; i < recipes.length; i++) {
   
      const uniqueRecipe = recipes[i];
      // console.log(uniqueRecipe);
      let containsAllTagsLinks = true;

      if (containsAllTagsLinks) {
        filteredRecipes.push(uniqueRecipe);
      }
    }

    return filteredRecipes;
  
  }

  searchInDropdown() {
    this.searchIngredient.addEventListener("input", () => {
      const searchTerm = this.searchIngredient.value.trim().toLowerCase();

      // on vide la liste dès 3 caractères saisis dans le champ
      if (searchTerm.length < 3) {
        return;
      }
      // Attention particulière à la saisie des accents
      normalize(searchTerm);

      // Attention particulière à la saisie des pluriels
      const pluralSearchTerm = searchTerm.endsWith("s");
      if (pluralSearchTerm) {
        searchTerm = searchTerm.slice(0, -1); // Effacer le s à la fin
      }
      const recipeList = Array.from(
        document.getElementsByClassName("list-group-item")
      );

      // Filtrer les ingrédients en fonction de la recherche saisie

      const filteredIngredients = recipeList
        .filter((ingredients) => {
          let ingredientName = ingredients.textContent;
          console.log(ingredientName);
          normalize(ingredientName);

          // Filter en fonction de la recherche avec des pluriels
          const pluralIngredientName = ingredientName.endsWith("s");
          if (pluralIngredientName) {
            ingredientName = ingredientName.slice(0, -1);
          }

          // La recherche correspond-elle au nom de l'ingrédient?
          return (
            ingredientName.includes(searchTerm) ||
            (pluralSearchTerm && ingredientName.includes(searchTerm + "s"))
          );
        })
        .map((ingredient) => {
          const ingredientText = ingredient.textContent;
          const matches = ingredientText.match(/^([^:]+)/);
          return matches ? matches[1].trim() : ingredientText.trim();
        });

      // Vider la liste existante d'ingrédients
      this.ingredientsList.innerHTML = "";
      // Supprimer les doublons
      const uniqueIngredients = [...new Set(filteredIngredients)];
      // Créer les éléments HTML pour chaque ingrédient filtré
      uniqueIngredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        const link = document.createElement("a");
        link.classList.add("list-group-item", "tag-ingredient");
        link.innerText = ingredient;

        // Ajouter l'élément de liste à la liste des ingrédients
        this.ingredientsList.appendChild(listItem);
        listItem.appendChild(link);
      });
    });
  }

  closeDropdown() {
    // Ajouter un écouteur d'événement pour fermer la dropdown
    document.addEventListener("click", (e) => {
      if (
        !e.target.matches(".dropdown-toggle") &&
        !e.target.matches("#inputSearchIngredients") &&
        !e.target.matches("#inputSearchAppliances") &&
        !e.target.matches("#inputSearchUstensils")
      ) {
        this.buttonGroupIngredients.classList.remove("active");
        this.buttonGroupAppliances.classList.remove("active");
        this.buttonGroupUstensils.classList.remove("active");
        this.dropdownMenu.forEach((menu) => {
          if (menu.style.display === "block") {
            menu.style.display = "none";
          }
        });
        this.searchIngredient.value = "";
      }
    });
  }
}
