import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ShortCutTypes } from '../main/shortCut'

export const EVENTS = {
  HIDE_WINDOW: 'hideWindow',
  SHORT_CUT: 'shortCut',
  SET_IGNORE_MOUSE_EVENTS: 'setIgnoreMouseEvents',
  OPEN_CONFIG_WINDOW: 'openConfigWindow',
  SQL: 'sql'
}

// Custom APIs for renderer
export const api = {
  hideWindow: () => {
    ipcRenderer.send(EVENTS.HIDE_WINDOW)
  },
  shortCut: (type: ShortCutTypes) => {
    return ipcRenderer.invoke(EVENTS.SHORT_CUT, type) // handle 對應 invoke
  },
  setIgnoreMouseEvents: (isIgnore: boolean, options?: { forward: boolean }) => {
    ipcRenderer.send(EVENTS.SET_IGNORE_MOUSE_EVENTS, isIgnore, options)
  },
  // config window
  openConfigWindow: () => {
    ipcRenderer.send(EVENTS.OPEN_CONFIG_WINDOW)
  },
  // sql (CRUD)
  sql: (sql: string, type: SqlActionsType, params = {}) => {
    return ipcRenderer.invoke(EVENTS.SQL, sql, type, params)
  },

  // new window config
  openWindow: (name: WindowNameType) => {
    ipcRenderer.send('openWindow', name)
  },
  closeWindow: (name: WindowNameType) => {
    ipcRenderer.send('closeWindow', name)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
