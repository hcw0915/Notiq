import { redirect } from 'react-router-dom'

export const ContentAction = async ({ request, params }) => {
  const data = await request.formData()

  await window.api.sql(
    `UPDATE contents SET title=@title, content=@content, category_id=@category_id where id=@id`,
    'update',
    {
      title: data.get('title'),
      content: data.get('content'),
      category_id: data.get('category_id'),
      id: params.id
    }
  )

  // 修改後自動定位修改後的資料夾內
  return redirect(`/config/category/contentList/${data.get('category_id')}/content/${params.id}`)
}
