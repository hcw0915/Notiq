import Database, * as BetterSqlite3 from 'better-sqlite3'
import { app } from 'electron'
import { resolve } from 'node:path'

// 設定 db 存在 電腦的某的地方，避免存在專案裡面 導致 更新時把 db 一併覆蓋掉
const file = resolve(app.getPath('home'), 'snippets.db')
const db: BetterSqlite3.Database = new Database(file, {})

/* db.pragma('journal_mode = WAL') 是用來設置 SQLite 資料庫的日誌模式（journal mode）。在這裡，WAL 代表 "Write-Ahead Logging" */
db.pragma('journal_mode = WAL')

export { db }

/**
 *  splite 需要工具編譯成 electron 可以使用的
 *  安裝 @electron-rebuild
 *  配合指令 "rebuild": "electron-rebuild -f -w"
 *  將 參數 -- better-sqlite3 傳入做 rebuild
 *  pnpm run rebuild -- better-sqlite3
 *
 */
