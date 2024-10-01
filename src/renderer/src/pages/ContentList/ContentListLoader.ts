export const ContentListLoader = async ({ request, params }) => {
  const url = new URL(request.url)
  const searchWord = url.searchParams.get('searchWord')
  const { cid } = params

  let sql = `SELECT * FROM contents`

  if (searchWord) {
    sql += ` WHERE title LIKE @searchWord ORDER BY id DESC`
    return window.api.sql(sql, 'findAll', { searchWord: `%${searchWord}%` })
  }

  if (cid !== undefined) {
    sql += ` WHERE category_id=${cid}`
  }

  sql += ' ORDER BY id DESC'

  return window.api.sql(sql, 'findAll')
}
