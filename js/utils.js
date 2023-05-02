export const removeDiacritics = (element) => {
  if (typeof element !== "string") {
    throw new TypeError("il faut une string");
  }

  return element
  .normalize("NFD") // Normaliser avec la forme NFD
  .replace(/\p{Diacritic}/gu, ""); // Retirer les diacritiques avec une expression régulière
};

