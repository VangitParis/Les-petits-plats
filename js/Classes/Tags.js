import { applyFilterByTags } from "../index.js";

export class Tags {
  constructor(tagLinks, recipes) {
    this.tagLinks = tagLinks;
    this.recipes = recipes;
    this.sectionTag = document.getElementById("section-tag");
    this.selectedTags = [];
    this.addTags();
  }

  addTags() {
    this.tagLinks.forEach((tagLink) => {
      tagLink.addEventListener("click", (e) => {
        e.preventDefault();

        const currentTag = tagLink.innerText;

        // Vérifier si le tag existe déjà dans le DOM
        const tagIsCreate = document.getElementById("tag-id-" + currentTag);
        if (tagIsCreate) {
          // Supprimer le tag du tableau des tags sélectionnés
          const index = this.selectedTags.indexOf(currentTag);
          if (index > -1) {
            this.selectedTags.splice(index, 1);
          }

          // Supprimer le lien du tableau des ingredients, appareils, ustensiles
          const recipeList = Array.from(
            document.getElementsByClassName("list-group-item")
          );
          let matchingLink = null;
          recipeList.forEach((link) => {
            if (link.innerText === currentTag) {
              matchingLink = link;
              return;
            }
          });

          // Supprimer l'élément de la liste s'il existe
          if (matchingLink) {
            const index = recipeList.indexOf(matchingLink);
            recipeList.splice(index, 1);
          }

          // Appliquer le filtre
          applyFilterByTags();
          return;
        }

        // Le tag n'existe pas encore, alors on le créé

        const tag = document.createElement("ul");
        tag.classList.add("btn", "btn-sm", "d-flex", "mt-n1", "tag");
        tag.id = `tag-id-${currentTag}`;

        tagLink.dataset.tag = currentTag;

        tagLink.dataset.tag = currentTag;
        // Ajouter une classe au tag en fonction de son type
        if (tagLink.classList.contains("tag-ingredient")) {
          tag.classList.add("tag-ingredient");
        } else if (tagLink.classList.contains("tag-appliance")) {
          tag.classList.add("tag-appliance");
        } else if (tagLink.classList.contains("tag-ustensil")) {
          tag.classList.add("tag-ustensil");
        }

        const tagElement = document.createElement("li");
        tagElement.textContent = currentTag;
        tagElement.classList.add("selected");

        const iconCloseTag = document.createElement("img");
        iconCloseTag.setAttribute("src", "../assets/iconCloseTag.svg");
        iconCloseTag.classList.add("icon-close-tag");
        iconCloseTag.tabIndex = "0";

        this.sectionTag.appendChild(tag);
        tag.appendChild(tagElement);
        tag.appendChild(iconCloseTag);

        iconCloseTag.addEventListener("click", () => {
          tag.remove();
          tagElement.classList.remove("selected");
          // Réinitialiser le tag s'il est supprimé
          const index = this.selectedTags.indexOf(currentTag);
          if (index > -1) {
            this.selectedTags.splice(index, 1);
          }

          // Appliquer le filtre
          applyFilterByTags();
        });

        // Ajouter le tag au tableau des tags sélectionnés
        this.selectedTags.push(currentTag);

        // Appliquer le filtre
        applyFilterByTags();
      });
    });
  }

  closeTagWithEscKey() {}
}
