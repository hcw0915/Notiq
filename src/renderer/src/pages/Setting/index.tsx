import { useState } from 'react'
import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

const SettingContainer = styled.main`
  ${tw`bg-slate-100 h-screen p-5`}
`

const SettingTitle = styled.h1`
  ${tw`flex justify-center text-sm`}
`

const SettingWrapper = styled.section`
  ${tw`border p-3 rounded-md bg-white my-5`}
`
const SettingSubTitle = styled.h5`
  ${tw`text-sm font-bold mb-2`}
`

const SettingInput = styled.input`
  ${tw`border w-full outline-none`}
`

export const Setting = () => {
  const config = useLoaderData() as ConfigDataType
  const submit = useSubmit()

  const [keys, setKeys] = useState<string[]>([])

  return (
    <Form method="POST">
      <SettingContainer>
        <SettingTitle>軟件配置</SettingTitle>
        <SettingWrapper>
          <SettingSubTitle>快捷鍵定義</SettingSubTitle>
          <SettingInput
            type="text"
            name="shortCut"
            readOnly
            defaultValue={config?.shortCut}
            onKeyDown={(e) => {
              if (e.metaKey || e.ctrlKey || e.altKey) {
                const code = e.code.replace(/Left|Right|Key|Digit/, '')
                // if (keys.includes(code)) return
                keys.push(code)
                setKeys(keys)
                // setKeys((prev) => [...prev, e.code.replace(/Left|Right|Key|Digit/, '')])
                e.currentTarget.value = keys.join('+')
                // console.log(keys)
              }
            }}
            onKeyUp={(e) => {
              // setKeys([])
              submit(e.currentTarget.form, { method: 'POST' })
            }}
          />
        </SettingWrapper>
        <SettingWrapper>
          <SettingSubTitle>數據庫</SettingSubTitle>
          <SettingInput
            type="text"
            name="databaseDirectory"
            defaultValue={config?.databaseDirectory}
          />
        </SettingWrapper>
      </SettingContainer>
    </Form>
  )
}
