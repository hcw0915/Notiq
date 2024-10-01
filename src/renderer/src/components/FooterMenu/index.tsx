import { Add, SettingTwo } from '@icon-park/react'
import { Link, useSubmit } from 'react-router-dom'

export const FooterMenu = () => {
  const submit = useSubmit()
  return (
    <div className={'nav'}>
      ˋ
      <Add
        theme="outline"
        size="20"
        strokeWidth={2}
        onClick={() => submit(null, { method: 'POST' })}
      />
      {/* <Link to="/config">
        <SettingTwo theme="outline" size="20" strokeWidth={2} />
      </Link> */}
    </div>
  )
}
