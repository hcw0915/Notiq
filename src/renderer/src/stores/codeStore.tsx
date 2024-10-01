import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface DataProps {
  config: ConfigDataType
  setConfig: (config: ConfigDataType) => void

  data: ContentType[] | undefined
  setData: (data: ContentType[] | undefined) => void

  search: string | undefined
  setSearch: (search: string | undefined) => void

  error: string
  setError: (error: string) => void

  editCategoryId: number
  setEditCategoryId: (id: number) => void
}

export const useDataStore = create(
  persist<DataProps>(
    (set) => ({
      /* 配置 */
      config: { databaseDirectory: '', shortCut: '' },
      setConfig: (config: ConfigDataType) => set({ config: config }),

      /* 儲存的資料  */
      data: [],
      setData: (data: ContentType[] | undefined) => set({ data: data }),

      /* search bar */
      search: '',
      setSearch: (search: string | undefined) => set({ search: search }),

      /* error */
      error: '',
      setError: (error: string) => set({ error: error }),

      /* 預期需要修改的 id */
      editCategoryId: 0,
      setEditCategoryId: (id: number) => set({ editCategoryId: id })
    }),
    {
      name: 'code-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
