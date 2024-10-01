import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

export const ignoreMouseEvents = (win: BrowserWindow) => {
  ipcMain.on(
    'setIgnoreMouseEvents',
    (_event: IpcMainEvent, isIgnore: boolean, options?: { forward: boolean }) => {
      win.setIgnoreMouseEvents(isIgnore, options)
    }
  )
}
