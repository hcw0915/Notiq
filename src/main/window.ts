import { app, BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron'

import { createWindow, OptionsType } from './createWindow'

// 窗口管理統一透過這裡做配置管理
export const config = {
  search: {
    id: 0,
    options: {
      initShow: true,
      x: 1000,
      hash: '',
      openDevTools: false,

      // custom
      enabledBlurHide: true
    }
  },
  code: {
    id: 0,
    options: {
      initShow: false,
      width: 1300,
      height: 700,
      frame: true,
      transparent: false,
      hash: '/#config/category/contentList',
      openDevTools: true
    }
  },
  config: {
    id: 0,
    options: {
      initShow: false,
      width: 500,
      height: 300,
      frame: true,
      transparent: false,
      hash: '/#config',
      openDevTools: true
    }
  }
} as Record<WindowNameType, { id: number; options: OptionsType }>

app.whenReady().then(() => {
  getWindowByName('search')
  // getWindowByName('config') // 為了調適快捷鍵頁面的調整
})

export const getWindowByName = (name: WindowNameType) => {
  let win = BrowserWindow.fromId(config[name].id)

  if (!win) {
    win = createWindow(config[name].options)
    config[name].id = win.id
  }

  return win
}

export const getWindowByEvent = (event: IpcMainEvent | IpcMainInvokeEvent) => {
  return BrowserWindow.fromWebContents(event.sender)!
}
