export class filterRecipes {
  constructor(recipes, searchText, keyword) {
    this.recipes = recipes;

    this.filterRecipesByText(recipes, searchText);
    this.filterRecipesByKeywords(recipes, keyword);
  }
  //Filtrage par Texte libre
  filterRecipesByText(recipes, searchText) {
    const filteredRecipes = [];

    const searchTerm = searchText.trim().toLowerCase().normalize("NFD").replace(/p{Diacritic}/g, "");

    // Vérifier si le terme de recherche contient un pluriel
    const pluralSearchTerm = searchTerm.endsWith("s");

    // Parcourir toutes les recettes
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      // Vérifier si le terme de recherche est présent dans le nom de la recette ou dans la description
      const name = recipe.name.trim().toLowerCase().normalize("NFD").replace(/p{Diacritic}/g, "");

      const description = recipe.description.trim().normalize("NFD").replace(/p{Diacritic}/g, "");

      if (name.indexOf(searchTerm) !== -1 || description.split(' ').some(word => word === searchTerm)) {
        filteredRecipes.push(recipe);
        continue;
        // Passer à la recette suivante si le terme de recherche est déjà trouvé dans le nom ou la description
      }

      // Vérifier si le terme de recherche est présent dans le nom d'un ingrédient
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientName = recipe.ingredients[j].ingredient.trim().toLowerCase()
        .normalize("NFD").replace(/p{Diacritic}/g, "");
        const pluralIngredientName = ingredientName.endsWith("s");
        if (ingredientName.includes(searchTerm) || (pluralSearchTerm && pluralIngredientName && searchTerm === ingredientName.slice(0, -1))) {
          filteredRecipes.push(recipe);
          break; // Passer à la recette suivante si le terme de recherche est trouvé dans le nom d'un ingrédient
        }
      }
    }
    // si aucun résultat n'est trouvé, afficher un message
    if (filteredRecipes.length === 0) {
      console.log(filteredRecipes);
      const section = document.getElementById("cards");
      // const message = document.createElement("p");
      // const divMessage = document.createElement("div");
      section.innerHTML  = `<p>Aucune recette ne correspond à votre critère... vous pouvez chercher \"tarte aux pommes\", \"poisson\", etc</p> `
      // message.classList.add("error");
      // console.log(message);
      // = message
      // divMessage.innerHTML= message;
    } 
    return filteredRecipes;

  }


  // Filtrage par mots clés
  filterRecipesByKeywords(recipes, keyword) {
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (
        (recipe.description && recipe.description.includes(keyword)) ||
        (recipe.ustensils && recipe.ustensils.includes(keyword)) ||
        (recipe.appliance && recipe.appliance.includes(keyword))
      ) {
        filteredRecipes.push(recipe);
      }
    }
    return filteredRecipes;
  }
}
