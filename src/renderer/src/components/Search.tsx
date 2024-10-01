import { SettingOne } from '@icon-park/react'

import { useDataStore } from '@renderer/stores/codeStore'
import { ChangeEvent } from 'react'

export const Search = () => {
  // const data = useDataStore((s) => s.data)
  const setData = useDataStore((s) => s.setData)
  const search = useDataStore((s) => s.search)
  const setSearch = useDataStore((s) => s.setSearch)

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value
    const data = await window.api.sql(
      `SELECT * FROM contents WHERE title LIKE @content LIMIT 6`,
      'findAll',
      {
        content: `%${searchWord}%`
      }
    )
    // console.log({ searchWord, data })
    // if (searchWord === '') {
    //   setSearch(searchWord)
    //   setData(data as ContentType[])
    // } else {
    //   setSearch(searchWord)
    //   //! 要拿到全部 data 所以這裡可能到時候要跟 db io 拿資料
    //   const filterCodes = data?.filter((code) =>
    //     code.content.toLowerCase().includes(searchWord.toLowerCase())
    //   )

    //   setData(filterCodes)
    // }
    setSearch(searchWord)
    setData(data as ContentType[])
  }

  const onSettingClick = () => {
    // alert('顯示頁面')
    window.api.openWindow('code')
  }

  return (
    // drag 需配合主進程的 frame: false(隱藏原生)
    <main className={`bg-slate-50 p-2.5 rounded-lg drag`}>
      {/* drag 時候是不能吃到 onClick 事件的 */}
      <section className="bg-slate-200 p-2.5 rounded-lg flex items-center gap-2 nodrag">
        {/* <button
          onClick={() => {
            window.api.sql('select * from categories', 'findAll').then((data) => {
              console.log(data)
            })
            window.api
              .sql(`INSERT INTO categories (name, created_at) values('vue3', datetime())`, 'insert')
              .then((data) => {
                console.log(data)
              })
          }}
        >
          qqq
        </button> */}
        <input
          className="w-full outline-none text-lg text-slate-600 bg-slate-200"
          autoFocus
          value={search}
          onChange={onSearch}
        />
        <SettingOne
          className="cursor-pointer "
          theme="outline"
          size="20"
          fill="#33495e"
          strokeWidth={4}
          onClick={onSettingClick}
        />
      </section>
      <section className="text-center text-slate-600 text-xs mt-2 drag select-none">
        Notiq
        {/* <span
          className="text-blue-500 cursor-pointer select-none"
          onClick={() => {
            window.api.openWindow('config')
          }}
        >
          配置
        </span> */}
      </section>
    </main>
  )
}
