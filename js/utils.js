import { Dropdown } from "./Dropdowns.js";

import { recipes } from "./mock/recipes.js";
export const removeDiacritics = (element) => {
  if (typeof element !== "string") {
    throw new TypeError("il faut une string");
  }

  return element
    .normalize("NFD") // Normaliser avec la forme NFD
    .replace(/\p{Diacritic}/gu, ""); // Retirer les diacritiques avec une expression régulière
};

// Supprimer les doublons
export const removeDuplicates = (arr) => {
  return arr.filter((item, index, array) => array.indexOf(item) === index);
};

// Fonction pour filtrer en fonction de la recherche
export const filterArray = (arr, searchTerm) => {
  return arr.filter((item) => {
    return item.includes(searchTerm);
  });
};

// Fonction pour mettre la première lettre en Majuscule
export const capitalizeArray = (arr) => {
  return arr.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });
};

// Fonction pour créer la liste des éléments
export const createListItem = (list, text, className) => {
  // Ne pas afficher l'ingrédient de la liste si il est deja sélectionné dans les tags
  // Vérifier si l'ingrédient existe déjà dans les tags
  // Vérifier si l'élément existe déjà dans la liste
  const existingTag = document.getElementById(`tag-id-${text}`);

  if (existingTag) {
    return;
  }
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  const itemLinkToDisplayTag = document.createElement("a");
  itemLinkToDisplayTag.tabIndex = "0";
  itemLinkToDisplayTag.classList.add("list-group-item", className);
  itemLinkToDisplayTag.innerText = text;
  // Ajouter un événement de clic à chaque lien de tag pour filtrer les recettes
  itemLinkToDisplayTag.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = new Dropdown(recipes);
    dropdown.filterRecipes(text);
  });
  // Ajouter l'élément de liste à la liste de la dropdown
  list.appendChild(listItem);
  listItem.appendChild(itemLinkToDisplayTag);
};
