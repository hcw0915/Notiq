import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './style.scss'
import { useState } from 'react'

export const Setting = () => {
  const config = useLoaderData() as ConfigDataType
  const submit = useSubmit()

  const [keys, setKeys] = useState<string[]>([])

  return (
    <Form method="POST">
      <main className="setting-page">
        <h1>軟件配置</h1>
        <section>
          <h5>快捷鍵定義</h5>
          <input
            type="text"
            name="shortCut"
            readOnly
            defaultValue={config?.shortCut}
            onKeyDown={(e) => {
              // console.log(e.code)
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
        </section>
        <section>
          <h5>數據庫</h5>
          <input type="text" name="databaseDirectory" defaultValue={config?.databaseDirectory} />
        </section>
      </main>
    </Form>
  )
}
