import { BrowserWindow, ipcMain } from 'electron'
import { createConfigWindow } from '../config'
// const { EVENTS } = require('./../preload/index')

export const registerIpc = (win: BrowserWindow) => {
  ipcMain.on('hideWindow', () => {
    win.hide()
  })
  ipcMain.on('openConfigWindow', () => {
    createConfigWindow()
  })
}
