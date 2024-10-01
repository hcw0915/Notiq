import { useNavigate } from 'react-router-dom'

export const useContent = () => {
  const navigate = useNavigate()

  const updateContentCategory = async (id: number, category_id: number) => {
    await window.api.sql(`UPDATE contents SET category_id=@category_id WHERE id=@id`, 'update', {
      id,
      category_id
    })

    //! redirect 只在 action / loader 中使用 => hooks 中使用 navigate 去做導向
    // redirect(`/config/category/contentList/${category_id}/content/${id}`)
    //& 導向到更新後的位置
    // navigate(`/config/category/contentList/${category_id}/content/${id}`)

    //& 不希望拖拽後遺到新的資料夾, 在原資料夾做重新刷新
    navigate(0) // window.location.reload()
  }

  return { updateContentCategory }
}
