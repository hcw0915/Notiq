import {
  app,
  BrowserWindow,
  // dialog,
  globalShortcut,
  ipcMain,
  // IpcMainEvent, // 正常 on
  IpcMainInvokeEvent // promise handle
} from 'electron'
import { getWindowByName } from './window'
import { findOne } from './db/query'

export type ShortCutTypes = 'search'

const config = {
  search: ''
}

// export const registerShortCut = (win: BrowserWindow) => {
// 原本使用 on => 但是要把 事件提示移到前端處理 而不是主進程渲染 所以改使用 handle (promise 的方式)
// 如果註冊失敗, 為了不影響渲染進程的進行 或是其他行為所以使用 異步的方式
//! 這裡可以在簡化 因為 type 只有 search 用得到 ep.170
ipcMain.handle('shortCut', (_event: IpcMainInvokeEvent, type: ShortCutTypes) => {
  const res = findOne(`SELECT * FROM config WHERE id=1`) as { content: string }
  const configData = JSON.parse(res.content)

  // 有重複註冊就把原本的拿掉 改用新的
  // if (config.search) globalShortcut.unregister(config.search)
  config.search = configData.shortCut

  // 依照不同事件做整理
  switch (type) {
    case 'search': {
      const win = getWindowByName('search')
      return registerSearchShortCut(win, configData.shortCut)
    }
    default:
      break
  }
})
// }

// 搜索使用

function registerSearchShortCut(win: BrowserWindow, shortCut: string) {
  const ret = globalShortcut.register(shortCut, () => {
    win.isVisible() ? win.hide() : win.show()
  })
  return ret
  // if (!ret) dialog.showErrorBox('溫馨提示', '註冊失效')
}

app.on('will-quit', () => {
  // globalShortcut.unregister('CommandOrControl')
  // 註銷所有快捷鍵
  globalShortcut.unregisterAll()
})
