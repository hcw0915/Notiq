import { api } from 'src/preload'
// import { ShortCutTypes } from './../main/shortCut'
// // import { api } from './index'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api // 直接定義一次就好 不需要每次都要手動新增
    // api: {
    //   hideWindow: () => void
    //   shortCut: (type: ShortCutTypes, shortCut: string) => Promise<boolean>
    // }
  }
}
