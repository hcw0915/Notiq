export const CategoryLoader = () => {
  return window.api.sql(`SELECT * FROM CATEGORIES ORDER BY id DESC`, 'findAll')
}
