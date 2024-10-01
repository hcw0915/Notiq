import { AllApplication } from '@icon-park/react'
import { NavLink } from 'react-router-dom'

export const QuickNav = () => {
  return (
    <main className="border-b">
      <div className="px-2 mt-2 opacity-90 mb-1">快捷操作</div>
      <NavLink
        to={`/config/category/contentList`}
        //! NavLink 預設點擊後 active, 所以可以不需要加跟下面一樣的判斷
        className={'item font-bold mb-1'}
        end
      >
        <div className="flex items-center gap-1">
          <AllApplication theme="outline" size="12" strokeWidth={3} />
          <div className="truncate">所有片段</div>
        </div>
      </NavLink>
      <NavLink to={`/config/category/contentList/0`} className={'item font-bold mb-1'} end>
        <div className="flex items-center gap-1">
          <AllApplication theme="outline" size="12" strokeWidth={3} />
          <div className="truncate">未分類</div>
        </div>
      </NavLink>
    </main>
  )
}
