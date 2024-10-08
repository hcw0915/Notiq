import { Outlet } from 'react-router-dom'
import { ContextMenuProvider } from 'mantine-contextmenu'

// context menu
import { MantineProvider } from '@mantine/core'

// import '@mantine/core/styles.layer.css' //! 要處理樣式問題
import 'mantine-contextmenu/styles.layer.css'
// import './layout.css'

const Config = () => {
  return (
    <MantineProvider defaultColorScheme="auto">
      <ContextMenuProvider>
        <main>
          <Outlet />
        </main>
      </ContextMenuProvider>
    </MantineProvider>
  )
}
export default Config
