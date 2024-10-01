import { useDataStore } from '@renderer/stores/codeStore'

export const useShortCut = () => {
  const setError = useDataStore((s) => s.setError)
  // const isRegister = await window.api.shortCut('search')
  const register = async () => {
    // const config = await window.api.sql('', 'config')
    const isBind = await window.api.shortCut('search')
    // if (!isBind) setError('按鍵註冊失敗')
    // console.log(isBind)
  }

  return {
    register
  }
}
