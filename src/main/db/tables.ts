import { Random } from 'mockjs'
import { db } from './connect'
import { findOne } from './query'

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS contents (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id INTEGER,
    created_at TEXT NOT NULL
  );
`)

// 配置項的資料表
db.exec(`
  CREATE TABLE IF NOT EXISTS config (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    content TEXT NOT NULL
  );
`)

function initData() {
  const isInit = findOne('select * from contents')

  if (isInit) return
  db.exec(`INSERT INTO config (content) VALUES('{"shortCut": "Alt+Space"}')`)

  for (let i = 1; i <= 10; i++) {
    const name = Random.title(5, 10)
    db.exec(`
      INSERT INTO categories (name, created_at) VALUES('${name}', datetime())
      `)
    for (let j = 1; j < 5; j++) {
      const title = Random.title(5, 10)
      const content = Random.paragraph(5, 10)
      db.exec(`
          INSERT INTO contents (title, content, category_id, created_at) VALUES('${title}', '${content}', ${j}, datetime())
          `)
    }
  }
}
initData()
