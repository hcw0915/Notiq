import { Outlet, useLoaderData } from 'react-router-dom'
import './style.scss'

import { CategoryItem } from '@renderer/components/CategoryItem'
import { QuickNav } from '@renderer/components/QuickNav'
import { FooterMenu } from '@renderer/components/FooterMenu'

export const Category = () => {
  const categories = useLoaderData() as CategoryType[]

  return (
    //! Todo 要處理 拖放問題
    <main className={'category-page'}>
      {/* <div></div> */}
      <div className={'categories'}>
        <QuickNav />
        {categories.map((category) => {
          return <CategoryItem key={category.id} category={category} />
        })}
      </div>

      <FooterMenu />
      <div className={'content'}>
        <Outlet />
      </div>
    </main>
  )
}
