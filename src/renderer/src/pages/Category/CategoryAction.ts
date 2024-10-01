import { redirect } from 'react-router-dom'

export const CategoryAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  switch (request.method) {
    case 'POST': {
      return window.api.sql(
        `INSERT INTO categories (name, created_at) values('未命名', datetime())`,
        'insert'
      )
      // return redirect(`/config/category/contentList/${id}`)
    }
    case 'PUT': {
      return window.api.sql(`UPDATE categories SET name=@name WHERE id=@id`, 'update', {
        id: data.id,
        name: data.name
      })
    }

    case 'DELETE': {
      await window.api.sql(`DELETE FROM categories WHERE id=@id`, 'del', {
        id: data.id
      })

      await window.api.sql(
        `UPDATE contents SET category_id=0 WHERE category_id=@category_id`,
        'update',
        {
          category_id: data.id
        }
      )

      return redirect('/config/category/contentList')
    }
  }

  return {}
}
