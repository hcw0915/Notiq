import { useDataStore } from '@renderer/stores/codeStore'
import { useEffect } from 'react'

export const Error = () => {
  const error = useDataStore((s) => s.error)
  const setError = useDataStore((s) => s.setError)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  if (!error) return null
  return <div className="bg-red-400 text-white px-2.5 py-1">{error}</div>
}
