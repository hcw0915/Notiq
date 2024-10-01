import { useDataStore } from '@renderer/stores/codeStore'
import { useEffect, useState } from 'react'
import './styles.scss'
// import { api } from 'src/preload'

const Result = () => {
  const data = useDataStore((s) => s.data)
  const search = useDataStore((s) => s.search)
  const setSearch = useDataStore((s) => s.setSearch)

  const [currentIndex, setCurrentIndex] = useState(0)

  const onMouseEnterIndex = (id: number) => () => {
    setCurrentIndex(id)
  }
  const onMouseLeaveIndex = () => {
    setCurrentIndex(-1)
  }

  const selectItem = async () => {
    if (!data?.length) return
    await navigator.clipboard.writeText(data[currentIndex].content)
    window.api.hideWindow()
    setSearch('')
  }

  const onListenKeyDown = (e: KeyboardEvent) => {
    if (!data?.length) return
    // console.log(e.code)
    switch (e.code) {
      case 'ArrowUp':
        if (currentIndex === 0) return
        setCurrentIndex((prev) => prev - 1)
        break
      case 'ArrowDown':
        if (currentIndex === data?.length - 1) return
        setCurrentIndex((prev) => prev + 1)
        break
      case 'Enter':
        selectItem()
        window.api.closeWindow('search')
        break
      case 'Escape':
        window.api.closeWindow('search')
        break
      default:
        return null
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onListenKeyDown)
    return () => {
      document.removeEventListener('keydown', onListenKeyDown)
    }
  }, [data, currentIndex])

  // 每次搜索重置 index
  useEffect(() => {
    setCurrentIndex(0)
  }, [data])

  return (
    <main className="container">
      {search &&
        data?.map((item, idx) => {
          const isActive = currentIndex === idx
          return (
            <div
              key={item.id}
              className={`item ${isActive ? 'active' : ''}`}
              onClick={selectItem}
              onMouseEnter={onMouseEnterIndex(idx)}
              onMouseLeave={onMouseLeaveIndex}
            >
              {item.title}
            </div>
          )
        })}
    </main>
  )
}

export default Result
