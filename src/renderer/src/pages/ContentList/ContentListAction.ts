import { redirect } from 'react-router-dom'

export const ContentListAction = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const cid = params.cid || 0

  switch (request.method) {
    case 'POST': {
      const id = await window.api.sql(
        `insert into contents (title,content,category_id,created_at) values('未命名片段', '', ${cid}, datetime())`,
        'insert'
      )
      //! 新增之後跳轉到該頁面編輯狀態
      return redirect(`content/${id}`)
    }
    case 'DELETE': {
      return await window.api.sql(`DELETE FROM contents WHERE id=${data.id}`, 'del')
    }
  }

  return {}
}
