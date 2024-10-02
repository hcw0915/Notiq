import { Form, NavLink, Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import dayjs from 'dayjs'
import { useContextMenu } from 'mantine-contextmenu'
import tw, { styled } from 'twin.macro'

import { Add, Delete, Edit } from '@icon-park/react'

const ContentListContainer = styled.main`
  ${tw`grid h-screen text-xs text-slate-700 bg-white`}
  grid-template: 'list content' auto / 15.625rem auto;
`

const ContentListWrapper = styled.div`
  ${tw`bg-slate-50 border-r overflow-y-auto cursor-pointer`}
  grid-area: list;
`

const ContentWrapper = styled.div`
  grid-area: content;
`

const SearchWrapper = styled.div`
  ${tw`border-b px-3 flex justify-between items-center`}
`

const SearchInput = styled.input`
  ${tw`outline-none py-2 w-full text-sm font-bold`}
`

const StyledNavLink = styled(NavLink)`
  ${tw`truncate p-1 cursor-pointer flex items-center justify-between gap-1 mx-1 hover:bg-slate-200`}
  &.active {
    ${tw`bg-blue-400 text-white mx-1 rounded-md`};
  }
`

const ContentText = styled.div`
  ${tw`truncate`}
`

const ContentTimeStamp = styled.div`
  ${tw`text-[0.625rem]`}
`

export const ContentList = () => {
  const contents = useLoaderData() as ContentType[]
  const { showContextMenu } = useContextMenu()

  const submit = useSubmit()

  return (
    <ContentListContainer>
      <ContentListWrapper>
        <Form>
          <SearchWrapper>
            <SearchInput
              name="search"
              type="text"
              placeholder="搜索..."
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
          </SearchWrapper>
        </Form>

        {contents.map((content) => {
          return (
            <StyledNavLink
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
              <ContentText>{content.title}</ContentText>
              <ContentTimeStamp>{dayjs(content.created_at).format('YY/MM/DD')}</ContentTimeStamp>
            </StyledNavLink>
          )
        })}
      </ContentListWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </ContentListContainer>
  )
}
