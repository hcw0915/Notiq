import { useSubmit } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import { Add } from '@icon-park/react'

const FooterContainer = styled.div`
  ${tw`border-r border-t bg-slate-100 flex justify-center items-center gap-2`}
`

export const FooterMenu = () => {
  const submit = useSubmit()

  const onClickSubmit = () => {
    submit(null, { method: 'POST' })
  }

  return (
    <FooterContainer>
      <Add theme="outline" size="20" strokeWidth={2} onClick={onClickSubmit} />
      {/* <Link to="/config">
        <SettingTwo theme="outline" size="20" strokeWidth={2} />
      </Link> */}
    </FooterContainer>
  )
}
