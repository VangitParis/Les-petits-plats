export class Tags {
    constructor(tagLinks) {
        this.tagLinks = tagLinks;
        this.sectionTag = document.getElementById("section-tag");
        
        this.displayTags();
    }
    displayTags() {
        // Tableau pour stocker les tags sélectionnés
        const selectedTags = [];
      
        // Ajouter un écouteur d'événement pour chaque lien de tag
        this.tagLinks.forEach((tagLink) => {
            tagLink.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(tagLink) 
                const currentTag = tagLink.innerText;
                console.log(currentTag);
                // Vérifier si le tag existe déjà dans le DOM
                const tagIsCreate = document.getElementById("tag-id-" + currentTag);
                if (tagIsCreate) {
                    return;
                }
      
                // Le tag n'existe pas encore, alors on le créé
                const tag = document.createElement("ul");
                tag.classList.add(
                    "btn",
                    "btn-sm",
                    "d-flex",
                    "mt-n1"
                );
                tag.id = `tag-id-${ currentTag }`;
      
                // Ajouter une classe au tag en fonction de son type
                if (tagLink.classList.contains("tag-ingredient")) {
                    tag.classList.add("tag-ingredient");

                } else if(tagLink.classList.contains("tag-appliance")){
                    tag.classList.add("tag-appliance");
                } else if (tagLink.classList.contains("tag-ustensil")) {
                    tag.classList.add("tag-ustensil");
                }
      
                const spanTag = document.createElement("li");
                spanTag.textContent = currentTag;
      
                const iconCloseTag = document.createElement("img");
                iconCloseTag.setAttribute("src", "../assets/iconCloseTag.svg");
                iconCloseTag.classList.add("icon-close-tag");
      
                this.sectionTag.appendChild(tag);
                tag.appendChild(spanTag);
                tag.appendChild(iconCloseTag);
      
                iconCloseTag.addEventListener("click", () => {
                    tag.remove();
                    // Réinitialiser le tag s'il est supprimé
                    const index = selectedTags.indexOf(currentTag);
                    if (index > -1) {
                        selectedTags.splice(index, 1);
                    }
                });
      
                // Ajouter le tag au tableau des tags sélectionnés
                selectedTags.push(currentTag);
            });
        });
    }
}