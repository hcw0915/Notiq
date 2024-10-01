export const SettingAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const content = JSON.stringify(data)

  console.log(content)
  // Todo 這裡沒有傳
  if (content.shortCut) {
    await window.api.shortCut('search')
  }
  // console.log(isRegister)
  // if (isRegister) {
  return window.api.sql(`UPDATE config SET content=@content WHERE id=1`, 'update', {
    content
  })
  // }
  // return {}
}
