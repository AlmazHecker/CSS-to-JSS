export const snakeToCamel = (str) => {
  return str.replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
};
