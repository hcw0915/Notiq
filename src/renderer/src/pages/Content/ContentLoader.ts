export const ContentLoader = async ({ params }) => {
  //! React router dom 會自動將數據 拉出來 所以不用 .then
  const content = await window.api.sql(`SELECT * FROM contents WHERE id = ${params.id}`, 'findOne')

  const categories = await window.api.sql(`SELECT * FROM categories ORDER BY id DESC`, 'findAll')

  return {
    content,
    categories
  }
}
