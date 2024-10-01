import { db } from './connect'

// prepare() 為了防止 injection, 先預留站位符號, id=?  後續 的查詢也不怕 1 / true 拿到全部資料

/* 查所有 */
export const findAll = (sql: string, params: Record<string, string | number> = {}) => {
  return db.prepare(sql).all(params)
}

/* 查單一 */
export const findOne = (sql: string) => {
  return db.prepare(sql).get()
}

/* 插入 */
export const insert = (sql: string) => {
  // 查入成功後自動回覆最後一個 id
  return db.prepare(sql).run().lastInsertRowid
}

/* 更新 */
export const update = (sql: string, params: Record<string, string | number> = {}) => {
  // 本次更新受影響的數量
  //! 需要處理 params 因為 有可能文本的 符號影響 sql 語句執行 以及防範 sql 注入行為
  return db.prepare(sql).run(params).changes
}

/* 刪除 */
export const del = (sql: string, params = {}) => {
  // 本次更新受影響的數量
  return db.prepare(sql).run(params).changes
}

export const config = () => {
  const res = findOne(`SELECT * FROM config WHERE id=1`) as ConfigType
  return JSON.parse(res.content)
}
