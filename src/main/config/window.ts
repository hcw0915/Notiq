import { is } from '@electron-toolkit/utils'
import { BrowserWindow, screen, shell } from 'electron'
import { join } from 'path'
import url from 'node:url'
import icon from '../../../resources/icon.png?asset'

export function createWindow(): BrowserWindow {
  // 獲取主視窗寬高
  const { width: winWidth } = screen.getPrimaryDisplay().workAreaSize

  const width = 500
  const height = 500
  // Create the browser window.
  const configWindow = new BrowserWindow({
    width,
    height,
    center: true,
    x: winWidth - width,
    y: 0,
    show: true,
    frame: true,
    transparent: false, // 背景透明
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false, // 使用 contextBridge 暴露 API
      contextIsolation: true
    },
    alwaysOnTop: true
  })

  // configWindow.setIgnoreMouseEvents(true, { forward: true }) // 讓透明的可以被穿透 但是全部都被穿透
  configWindow.webContents.openDevTools()

  configWindow.on('ready-to-show', () => {
    configWindow.show()
  })

  configWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    //! 隨著 route 改變, 也要同步變化 這裏 loadURL 的值
    // configWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#config/category/contentList')
    configWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/#config') //! 調適使用 直接加載進 Setting
  } else {
    // configWindow.loadFile(join(__dirname, '../renderer/index.html'))
    // 編譯時的內容
    configWindow.loadURL(
      url.format({
        //編譯後的文件
        pathname: join(__dirname, '../renderer/index.html'),
        // 協議
        protocol: 'file',
        // protocol 後面需要兩個 //
        slashes: true,
        // 是否 hash
        //! 隨著 route 改變, 也要同步變化 這裏 loadURL 的值
        hash: 'config/category/contentList'
      })
    )
  }

  return configWindow
}
