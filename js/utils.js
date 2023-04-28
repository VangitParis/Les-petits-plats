export const removeDiacritics = (element) => {
  if (typeof element !== "string") {
    throw new TypeError("il faut une string");
  }

  return element
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/Diacritics/g, "");
};
