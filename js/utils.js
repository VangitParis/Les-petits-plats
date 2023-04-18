export const normalize = (element) => {
  if (typeof element !== "string") {
    throw new TypeError("il faut une string");
  }

  return element
    .trim()
    .toLowerCase()
    .replace(/[àáâä]/g, "a")
    .replace(/[éèêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o")
    .replace(/[ùûü]/g, "u")
    .replace(/[ç]/g, "c");
};
