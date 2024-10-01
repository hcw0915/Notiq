import { Category } from '@renderer/pages/Category'
import { CategoryAction } from '@renderer/pages/Category/CategoryAction'
import { CategoryLoader } from '@renderer/pages/Category/CategoryLoader'
import Config from '@renderer/pages/Config'
import { Content } from '@renderer/pages/Content'
import { ContentAction } from '@renderer/pages/Content/ContentAction'
import { ContentLoader } from '@renderer/pages/Content/ContentLoader'
import { ContentList } from '@renderer/pages/ContentList'
import { ContentListAction } from '@renderer/pages/ContentList/ContentListAction'
import { ContentListLoader } from '@renderer/pages/ContentList/ContentListLoader'
import Home from '@renderer/pages/Home'

import { Setting } from '@renderer/pages/Setting'
import { SettingAction } from '@renderer/pages/Setting/SettingAction'
import { SettingLoader } from '@renderer/pages/Setting/SettingLoader'
import { Welcome } from '@renderer/pages/Welcome'
import { createHashRouter } from 'react-router-dom'

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'config',
    element: <Config />,
    children: [
      {
        index: true,
        element: <Setting />,
        action: SettingAction,
        loader: SettingLoader
      },
      {
        path: 'category',
        element: <Category />,
        loader: CategoryLoader,
        action: CategoryAction,
        children: [
          {
            // :id? 把問題變成可選參數
            path: 'contentList/:cid?',
            element: <ContentList />,
            loader: ContentListLoader,
            action: ContentListAction,
            children: [
              {
                // 當沒有匹配到路由的時候會顯示這個
                index: true,
                element: <Welcome />
              },
              {
                path: 'content/:id',
                element: <Content />,
                loader: ContentLoader,
                action: ContentAction
              }
            ]
          }
        ]
      }
    ]
  }
])
