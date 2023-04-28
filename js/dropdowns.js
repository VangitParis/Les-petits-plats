import { Tags } from "./Tags.js";
import { normalize } from "./utils.js";

export class Dropdown {
  constructor(recipes, uniqueRecipes) {
    this.recipes = recipes;
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

    this.addDropdownButtonListener();

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
        this.searchInDropdown();
       
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

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.getAppliances();
        this.searchInDropdown();
        
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
        this.searchInDropdown();
        
      }
    });
  }

  getIngredients() {
    //Appeler uniqueRecipes ici a la place this.recipes

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
      // Ne pas afficher l'ingrédient de la liste si il est deja sélectionné dans les tags
      // Vérifier si l'ingrédient existe déjà dans les tags
      const existingTag = document.getElementById(
        `tag-id-${capitalizedIngredient}`
      );

      if (existingTag) {
        return;
      }

      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const link = document.createElement("a");
      link.classList.add("list-group-item", "tag-ingredient");
      link.innerText = capitalizedIngredient;

      // Ajouter l'élément de liste à la liste des ingrédients
      this.ingredientsList.appendChild(listItem);
      listItem.appendChild(link);
    });

    const recipeList = Array.from(
      document.getElementsByClassName("list-group-item")
    );

    const addTags = new Tags(recipeList, this.recipes);
    const addTagsInDOM = addTags.displayTags();
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
    const recipeList = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const filteredByTags = new Tags(recipeList, this.recipes);
    const filtered = filteredByTags.displayTags();
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
    const recipeList = Array.from(
      document.getElementsByClassName("list-group-item")
    );
    const addTag = new Tags(recipeList, this.recipes);
    addTag.displayTags(this.recipes);
  }
  // Fonction de filtrage des recettes en fonction des ingrédients sélectionnés
  filterRecipes(tagLinks) {
    const filteredRecipes = [];

    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];

      let containsAllTagsLinks = true;

      if (containsAllTagsLinks) {
        filteredRecipes.push(recipe);
      }
    }

    return filteredRecipes;
  }

  searchInDropdown() {
    this.searchIngredients.addEventListener("input", () => {
      const searchTerm = this.searchIngredients.value.trim().toLowerCase();

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
      this.searchInDropdown();
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
