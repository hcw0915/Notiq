import { useEffect, useRef } from 'react'
import { Error } from '@renderer/components/Error'
import Result from '@renderer/components/Result'
import { Search } from '@renderer/components/Search'
import { useShortCut } from '@renderer/hooks/useShortCut'
import { useDataStore } from '@renderer/stores/codeStore'

function Home(): JSX.Element {
  const data = useDataStore((s) => s.data)
  const error = useDataStore((s) => s.error)
  const { register } = useShortCut()
  // register('search', 'CommandOrControl+Shift+]')
  const mainRef = useRef<HTMLDivElement | null>(null)

  // Todo: 抽離點擊事件穿透邏輯 => Lesson 66
  useEffect(() => {
    mainRef.current?.addEventListener('mouseover', () => {
      window.api.setIgnoreMouseEvents(false)
    })
    document.body.addEventListener('mouseover', (e: MouseEvent) => {
      if (e.target === document.body) {
        window.api.setIgnoreMouseEvents(true, { forward: true })
      }
    })
    // return () => {
    //   mainRef.current?.removeEventListener('mouseover', setIgnore(false))
    //   document.body.removeEventListener('mouseover', setIgnore(true))
    // }
  }, [])

  useEffect(() => {
    register()
    // window.api.openConfigWindow()
  }, [])

  return (
    // 不是很懂這段 = =
    <main className="p-2" ref={mainRef}>
      {error && <Error />}
      <Search />
      {data && <Result />}
    </main>
  )
}

export default Home
