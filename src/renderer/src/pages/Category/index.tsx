import { Outlet, useLoaderData } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import { CategoryItem } from '@renderer/components/CategoryItem'
import { FooterMenu } from '@renderer/components/FooterMenu'
import { QuickNav } from '@renderer/components/QuickNav'

const CategoryContainer = styled.main`
  ${tw`h-screen w-screen grid`}
  grid-template:
    'categories content' auto
    'nav content' 2rem/10rem auto;
`

const CategoryWrapper = styled.div`
  ${tw`border-r bg-slate-100 text-xs text-slate-700 overflow-y-auto gap-1 flex flex-col`}
  grid-area: categories;
`

const Content = styled.div`
  grid-area: content;
`

export const Category = () => {
  const categories = useLoaderData() as CategoryType[]
  // const [leftWidth, setLeftWidth] = useState(250) // 左側初始寬度
  // const [isResizing, setIsResizing] = useState(false)

  // const handleMouseDown = () => setIsResizing(true)

  // const handleMouseMove = (e: MouseEvent) => {
  //   if (isResizing) {
  //     const newWidth = e.clientX
  //     if (newWidth > 100 && newWidth < window.innerWidth - 100) {
  //       setLeftWidth(newWidth) // 動態設置左側欄位的寬度
  //     }
  //   }
  // }

  // const handleMouseUp = () => setIsResizing(false)

  // // 註冊事件來監聽 mousemove 和 mouseup
  // React.useEffect(() => {
  //   if (isResizing) {
  //     window.addEventListener('mousemove', handleMouseMove)
  //     window.addEventListener('mouseup', handleMouseUp)
  //   } else {
  //     window.removeEventListener('mousemove', handleMouseMove)
  //     window.removeEventListener('mouseup', handleMouseUp)
  //   }
  // }, [isResizing])

  return (
    <CategoryContainer>
      <CategoryWrapper>
        <QuickNav />
        {categories.map((category, i) => (
          <CategoryItem category={category} key={i} />
        ))}
      </CategoryWrapper>

      <Content>
        <Outlet />
      </Content>
      <FooterMenu />
    </CategoryContainer>
  )
}
