import { Tags } from "./tags.js";

export class Dropdown {
  constructor(recipes) {
    this.recipes = recipes;

    this.dropdownButtonIngredients = document.getElementById("dropdownButtonIngredients");
    this.dropdownButtonAppliances = document.getElementById("dropdownButtonAppliances");
    this.dropdownButtonUstensils = document.getElementById("dropdownButtonUstensils");

    this.ingredientsList = document.getElementById("ingredientsList");
    this.appliancesList = document.getElementById("appliancesList");
    this.ustensilsList = document.getElementById("ustensilsList");

    this.dropdownMenu = document.querySelectorAll(".dropdown-menu");
    this.searchInput = document.getElementById("inputSearch");
    this.ingredientsList = document.getElementsByClassName("list-group")[0];
   
    this.addDropdownButtonListener();
    this.searchInDropdown();
    this.closeDropdown();

  }

  addDropdownButtonListener() {
    this.dropdownButtonIngredients.addEventListener("click", (e) => {
      e.preventDefault();
      this.dropdownButtonIngredients.classList.toggle("active");
     

      if (this.dropdownButtonIngredients.classList.contains("active")) {
        const dropdownMenu = document.getElementsByClassName("dropdown-ingredients")[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.searchInDropdown();
        this.getIngredients();
      }
    });
  

    this.dropdownButtonAppliances.addEventListener("click", (e) => {
      e.preventDefault();
      this.dropdownButtonAppliances.classList.toggle("active");
      if (this.dropdownButtonAppliances.classList.contains("active")) {
       const dropdownMenu = document.getElementsByClassName("dropdown-appliances")[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.searchInDropdown();
        this.getAppliances();
      }
    
    });

    this.dropdownButtonUstensils.addEventListener("click", (e) => {
      e.preventDefault();
      this.dropdownButtonUstensils.classList.toggle("active");
      if (this.dropdownButtonUstensils.classList.contains("active")) {
        const dropdownMenu = document.getElementsByClassName("dropdown-ustensils")[0];
        dropdownMenu.style.display = "block";

        // Appeler les méthodes de recherche et de récupération de la liste d'ingrédients
        this.searchInDropdown();
        this.getUstensils();
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
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const link = document.createElement("a");
      link.classList.add("list-group-item", "tag-ingredient");
      link.innerText = capitalizedIngredient;

      // Ajouter l'élément de liste à la liste des ingrédients
      this.ingredientsList.appendChild(listItem);
      listItem.appendChild(link);
    });

    const ingredientsLinks = Array.from(document.getElementsByClassName("list-group-item"));
    const filteredByTags = new Tags(ingredientsLinks, this.recipes);
    const filtered = filteredByTags.displayTags();
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
          const listItem = document.createElement("li");
          listItem.classList.add("list-item");
          const link = document.createElement("a");
          link.classList.add("list-group-item", "tag-appliance");
          link.innerText = capitalizedAppliance;
    
          // Ajouter l'élément de liste à la liste des appareils
          this.appliancesList.appendChild(listItem);
          listItem.appendChild(link);
        });
        const appliancesLinks = Array.from(document.getElementsByClassName("list-group-item"));
        const filteredByTags = new Tags(appliancesLinks, this.recipes);
        const filtered = filteredByTags.displayTags();
      }
      getUstensils() {
        // Récupérer tous les ustensiles à partir des recettes
        const allUstensils = this.recipes.reduce((acc, recipe) => {
          let recipeUstensils = recipe.ustensils.map((item) =>
            item.toLowerCase()
          );
      
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
          const listItem = document.createElement("li");
          listItem.classList.add("list-item");
          const link = document.createElement("a");
          link.classList.add("list-group-item", "tag-ustensil");
          link.innerText = capitalizedUstensil;
      
          // Ajouter l'élément de liste à la liste des ustensiles
          this.ustensilsList.appendChild(listItem);
          listItem.appendChild(link);
        });
        const ustensilsLinks = Array.from(document.getElementsByClassName("list-group-item"));
        const filteredByTags = new Tags(ustensilsLinks, this.recipes);
        const filtered = filteredByTags.displayTags();
      }
  
  
  searchInDropdown() {
    this.searchInput.addEventListener("input", () => {
      let searchTerm = this.searchInput.value.trim().toLowerCase();
      // on vide la liste dès 3 caractères saisis dans le champ
      if (searchTerm.length < 3) {
        this.ingredientsList.innerHTML = "";
        this.dropdownMenu.classList.add("dropdown-menu-sm-size");
        return;
      }
      // Attention particulière à la saisie des accents
      searchTerm = searchTerm.replace(/[àáâä]/g, "a");
      searchTerm = searchTerm.replace(/[éèêë]/g, "e");
      searchTerm = searchTerm.replace(/[îï]/g, "i");
      searchTerm = searchTerm.replace(/[ôö]/g, "o");
      searchTerm = searchTerm.replace(/[ùûü]/g, "u");
      searchTerm = searchTerm.replace(/[ç]/g, "c");

      // Attention particulière à la saisie des pluriels
      const pluralSearchTerm = searchTerm.endsWith("s");
      if (pluralSearchTerm) {
        searchTerm = searchTerm.slice(0, -1); // Effacer le s à la fin
      }

      // Filtrer les ingrédients en fonction de la recherche saisie
      const filteredIngredients = this.recipes.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => {
          let ingredientName = ingredient.ingredient
            .toLowerCase()
            .replace(/[àáâä]/g, "a")
            .replace(/[éèêë]/g, "e")
            .replace(/[îï]/g, "i")
            .replace(/[ôö]/g, "o")
            .replace(/[ùûü]/g, "u")
            .replace(/[ç]/g, "c");

          // Filter en fonction de la recherche avec des pluriels
          const pluralIngredientName = ingredientName.endsWith("s");
          if (pluralIngredientName) {
            ingredientName = ingredientName.slice(0, -1);
          }

          // Recherche matche avec le nom de l'ingrédient ?
          return (
            ingredientName.includes(searchTerm) ||
            (pluralSearchTerm && ingredientName.includes(searchTerm + "s"))
          );
        });
      });
      // Vider la liste existante d'ingrédients
      this.ingredientsList.innerHTML = "";

      // Ajouter les ingrédients filtrés à la liste des ingrédients
      filteredIngredients.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          let searchResults = []; // création d'un tableau pour stocker les résultats

          let ingredientName = ingredient.ingredient;
          if (ingredientName.includes(searchTerm)) {
            let regex = new RegExp(searchTerm, "gi");
            let matches = ingredientName.match(regex);
            if (matches.length > 0) {
              for (let j = 0; j < matches.length; j++) {
                searchResults.push(matches[j]); // stocke tous les résultats dans le tableau
              

              
                //Ajouter une classe à l'élément li pour faciliter la recherche ultérieure
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                listItem.classList.add("list-item");
                link.classList.add("list-group-item");
                link.textContent = searchResults;
                this.ingredientsList.appendChild(listItem);
                listItem.appendChild(link);
              }
            }
          }
        });
      });
    });
   
  }

  closeDropdown() {
    // Ajouter un écouteur d'événement pour fermer la dropdown
    document.addEventListener("click", (e) => {
      if (
        !e.target.matches(".dropdown-toggle") &&
        !e.target.matches("#inputSearch")
      ) {
        this.dropdownButtonIngredients.classList.remove("active");
        this.dropdownButtonAppliances.classList.remove("active");
        this.dropdownButtonUstensils.classList.remove("active");
        this.dropdownMenu.forEach(menu => {
          if (menu.style.display === "block") {
            menu.style.display = "none";
            menu.classList.remove("dropdown-menu-sm-size");
          }
        });
        this.searchInput.value = "";
      }
    });
  }
  
}
