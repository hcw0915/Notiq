import { Delete, Edit, FolderClose } from '@icon-park/react'
import { useContent } from '@renderer/hooks/useContent'
import { useDataStore } from '@renderer/stores/codeStore'
import { useContextMenu } from 'mantine-contextmenu'
import { NavLink, useFetcher, useSubmit } from 'react-router-dom'

type CategoryItemProps = {
  category: CategoryType
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { category } = props

  const editCategoryId = useDataStore((s) => s.editCategoryId)
  const setEditCategoryId = useDataStore((s) => s.setEditCategoryId)

  const { showContextMenu } = useContextMenu()
  const submit = useSubmit()
  const fetcher = useFetcher()
  const { updateContentCategory } = useContent()

  const onDoubleClickEdit = (id: number) => () => {
    setEditCategoryId(id)
  }

  const onRenameEnter = (e) => {
    if (e.key === 'Enter') {
      //! fetcher 的提交不會讓 submit 行為做路由跳轉
      fetcher.submit({ id: category.id, name: e.currentTarget.value }, { method: 'PUT' })
      setEditCategoryId(0)
    }
  }

  return (
    <>
      {editCategoryId === category.id ? (
        <div className="input">
          <input type="text" defaultValue={category.name} autoFocus onKeyDown={onRenameEnter} />
        </div>
      ) : (
        <NavLink
          to={`/config/category/contentList/${category.id}`}
          //! 不需要再另外記住哪個是 active 可以透過 <NavLink 獲得 className isActive 狀態
          className={({ isActive }) => (isActive ? 'active item' : 'item')}
          onDoubleClick={onDoubleClickEdit(category.id)}
          onDragOver={(e) => {
            //! onDrop 需要先取消 Over 的預設事件
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
            e.currentTarget.classList.add('dragging')
          }}
          onDragLeave={(e) => e.currentTarget.classList.remove('dragging')}
          onDrop={async (e) => {
            e.currentTarget.classList.remove('dragging')
            const targetId = +e.dataTransfer.getData('id')
            await updateContentCategory(targetId, category.id)
          }}
          onContextMenu={showContextMenu(
            [
              {
                key: 'remove',
                icon: <Delete theme="outline" size={16} strokeWidth={3} />,
                title: '刪除分類',
                onClick: () => {
                  submit({ id: category.id }, { method: 'DELETE' })
                }
              },
              {
                key: 'edit',
                icon: <Edit theme="outline" size={16} strokeWidth={3} />,
                title: '編輯分類',
                onClick: () => {
                  submit({ id: category.id }, { method: 'DELETE' })
                }
              },
              {
                key: 'rename',
                icon: <Edit theme="outline" size={16} strokeWidth={3} />,
                title: '修改分類名稱',
                onClick: onDoubleClickEdit(category.id)
              }
            ],
            { className: 'contextMenu' }
          )}
        >
          <FolderClose theme="outline" size="12" strokeWidth={3} />
          <div className="truncate">{category.name}</div>
        </NavLink>
      )}
    </>
  )
}
