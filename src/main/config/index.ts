import { BrowserWindow } from 'electron'
import { createWindow } from './window'

let win: null | BrowserWindow
export const createConfigWindow = () => {
  if (!win) win = createWindow()
  win.on('close', () => (win = null))
}
