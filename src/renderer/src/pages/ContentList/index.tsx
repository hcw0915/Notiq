import { Form, NavLink, Outlet, useLoaderData, useParams, useSubmit } from 'react-router-dom'
import './style.scss'
import { useContextMenu } from 'mantine-contextmenu'

import dayjs from 'dayjs'
import { Add, Delete, Edit } from '@icon-park/react'
// import { ChangeEvent, useMemo, useState } from 'react'

export const ContentList = () => {
  const params = useParams()

  const contents = useLoaderData() as ContentType[]
  const { showContextMenu } = useContextMenu()

  const submit = useSubmit()
  // const [search, setSearch] = useState('')

  // const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value)
  // }

  // const filterContents = useMemo(() => {
  //   return contents.filter((content) => content.title.toLowerCase().includes(search))
  // }, [search, contents])

  return (
    <main className="contentList-page">
      <div className="list">
        <Form>
          <div className="border-b px-3 flex justify-between items-center">
            <input
              name="search"
              type="text"
              placeholder="搜索..."
              className="outline-none py-2 w-full text-sm font-bold"
              // value={search}
              // onChange={onSearch}
              onChange={(e) => submit(e.target.form)}
            />

            <Add
              theme="outline"
              size="18"
              strokeWidth={2}
              onClick={() => submit(null, { method: 'POST' })}
            />
          </div>
        </Form>

        {contents.map((content) => {
          return (
            <NavLink
              to={`/config/category/contentList/${content.category_id}/content/${content.id}`}
              key={content.id}
              className="flex items-center justify-center"
              onDragStart={(e) => {
                e.dataTransfer.setData('id', String(content.id))
              }}
              onContextMenu={showContextMenu(
                [
                  {
                    key: 'remove',
                    icon: <Delete theme="outline" size={16} strokeWidth={3} />,
                    title: '刪除片段',
                    onClick: () => {
                      submit({ id: content.id }, { method: 'DELETE' })
                    }
                  },
                  {
                    key: 'edit',
                    icon: <Edit theme="outline" size={16} strokeWidth={3} />,
                    title: '編輯片段',
                    onClick: () => {
                      // submit({ id: content.id }, { method: 'DELETE' })
                    }
                  }
                ],
                { className: 'contextMenu' }
              )}
            >
              <div className="truncate">{content.title}</div>
              <div className="text-[0.625rem]">{dayjs(content.created_at).format('YY/MM/DD')}</div>
            </NavLink>
          )
        })}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  )
}
