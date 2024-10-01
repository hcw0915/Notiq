import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { config, getWindowByEvent } from './window'
import { createWindow } from './createWindow'

ipcMain.on('openWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  // 找窗口建立的 id
  let win = BrowserWindow.fromId(config[name].id)

  if (!win) {
    // 如果沒有 就建一個, 並且把新建的那個 id 給 config
    win = createWindow(config[name].options)
    config[name].id = win.id
  }
  win.show()

  // getWindowByName(name).show() // 抽象封裝後
})

ipcMain.on('closeWindow', (_event: IpcMainEvent, name: WindowNameType) => {
  let win = BrowserWindow.fromId(config[name].id)

  if (!win) {
    win = createWindow(config[name].options)
    config[name].id = win.id
  }
  win.hide()

  // getWindowByName(name).hide() // 抽象封裝後
})

ipcMain.on(
  'setIgnoreMouseEvents',
  (_event: IpcMainEvent, isIgnore: boolean, options?: { forward: boolean }) => {
    const win = getWindowByEvent(_event)
    win.setIgnoreMouseEvents(isIgnore, options)
  }
)
