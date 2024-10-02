import { NavLink } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import { AllApplication } from '@icon-park/react'

const NavContainer = styled.main`
  ${tw`border-b`}
`

const NavTitle = styled.div`
  ${tw`px-2 mt-2 opacity-90 mb-1`}
`

const StyledNavLink = styled(NavLink)`
  ${tw`font-bold h-[1.5rem] mb-1 px-2 py-1 truncate cursor-pointer flex items-center gap-1 
    hover:bg-slate-200 hover:rounded-md
  `}
  // NavLink 要處理的樣式問題: https://stackoverflow.com/questions/73419801/how-to-make-activeclass-on-navlink-styled-component
  &.active {
    ${tw`bg-blue-400 text-white mx-1 rounded-md`}
  }
`

const ItemWrapper = styled.div`
  ${tw`flex items-center gap-1`}
`

const ItemText = styled.div`
  ${tw`truncate`}
`

export const QuickNav = () => {
  return (
    <NavContainer>
      <NavTitle>快捷操作</NavTitle>
      {/* //! NavLink 預設點擊後 active, 所以可以不需要加跟下面一樣的判斷 */}
      <StyledNavLink to={`/config/category/contentList`} end>
        <ItemWrapper>
          <AllApplication theme="outline" size="12" strokeWidth={3} />
          <ItemText>所有片段</ItemText>
        </ItemWrapper>
      </StyledNavLink>
      <StyledNavLink to={`/config/category/contentList/0`} end>
        <ItemWrapper>
          <AllApplication theme="outline" size="12" strokeWidth={3} />
          <ItemText>未分類</ItemText>
        </ItemWrapper>
      </StyledNavLink>
    </NavContainer>
  )
}
