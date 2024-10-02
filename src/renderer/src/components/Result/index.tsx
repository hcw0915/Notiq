import { useEffect, useState } from 'react'
import tw, { styled } from 'twin.macro'

import { useDataStore } from '@renderer/stores/codeStore'

const ResultContainer = styled.div`
  ${tw`bg-slate-50 px-2.5 rounded-b-lg mt-[-0.625rem] pb-2`}
`

const ResultItem = styled.div<{ isActive: boolean }>`
  ${tw`text-slate-700 truncate mb-1 px-2.5 py-1 rounded-lg hover:bg-orange-400 hover:text-white hover:rounded-lg hover:cursor-pointer`}
  ${(p) => p.isActive && tw`bg-orange-400 text-white rounded-lg`}
`

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
    //! 這裡有 ```js 這種地方要處理
    const copyText = data[currentIndex].content.replace(/```/g, '')
    await navigator.clipboard.writeText(copyText)
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
        return
      case 'ArrowDown':
        if (currentIndex === data?.length - 1) return
        setCurrentIndex((prev) => prev + 1)
        return
      case 'Enter':
        selectItem()
        window.api.closeWindow('search')
        return
      case 'Escape':
        window.api.closeWindow('search')
        return
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
    <ResultContainer>
      {search &&
        data?.map((item, idx) => {
          const isActive = currentIndex === idx
          return (
            <ResultItem
              key={item.id}
              isActive={isActive}
              onClick={selectItem}
              onMouseEnter={onMouseEnterIndex(idx)}
              onMouseLeave={onMouseLeaveIndex}
            >
              {item.title}
            </ResultItem>
          )
        })}
    </ResultContainer>
  )
}

export default Result
