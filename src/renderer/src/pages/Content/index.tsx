import { useCallback, useEffect, useRef, useState } from 'react'
import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import { debounce } from 'lodash-es'
import tw, { styled } from 'twin.macro'

import MDEditor from '@uiw/react-md-editor'

const ContentContainer = styled.div`
  ${tw`grid h-screen overflow-y-auto`}
  grid-template-rows: 3rem 2rem 1fr;
`

const ContentTitleInput = styled.input`
  ${tw`bg-slate-50 outline-none text-lg p-3`}
`

const Select = styled.select`
  ${tw`bg-slate-50 outline-none w-full`}
`

const Option = styled.option``

const MarkDownContainer = styled.div`
  ${tw`h-full`}
`

export const Content = () => {
  const { content, categories } = useLoaderData() as {
    content: ContentType
    categories: CategoryType[]
  }
  const submit = useSubmit()
  const [editorValue, setEditorValue] = useState(content.content)
  const [isComposing, setIsComposing] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const debouncedSubmit = useCallback(
    debounce((form: HTMLFormElement) => {
      submit(form)
    }, 500),
    [submit]
  )

  // 處理編輯器值變化事件
  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || '')
    if (textareaRef.current && !isComposing) {
      textareaRef.current.value = value || ''
      debouncedSubmit(textareaRef.current.form as HTMLFormElement)
    }
  }

  // 處理編輯器輸入法開始事件
  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  // 處理編輯器輸入法結束事件
  const handleCompositionEnd = () => {
    setIsComposing(false)
    if (textareaRef.current) {
      textareaRef.current.value = editorValue
      debouncedSubmit(textareaRef.current.form as HTMLFormElement)
    }
  }

  // 當編輯器值變化時更新 textarea 的值
  useEffect(() => {
    if (textareaRef.current && !isComposing) {
      textareaRef.current.value = editorValue
    }
  }, [editorValue, isComposing])

  // 當 content 變化時更新 editorValue
  useEffect(() => {
    setEditorValue(content.content)
  }, [content.content])

  return (
    <Form method="PUT">
      <ContentContainer key={content.id}>
        <ContentTitleInput
          name="title"
          type="text"
          autoFocus
          defaultValue={content.title}
          onChange={(e) => debouncedSubmit(e.target.form)}
        />
        <Select
          name="category_id"
          value={content.category_id}
          onChange={(e) => debouncedSubmit(e.target.form)}
        >
          <Option value="0">未分類</Option>
          {categories.map((cat) => (
            <Option key={cat.id} value={cat.id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <MarkDownContainer data-color-mode="light">
          <MDEditor
            className="!h-screen "
            value={editorValue}
            onChange={handleEditorChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        </MarkDownContainer>

        <textarea
          ref={textareaRef}
          name="content"
          placeholder="請輸入內容..."
          value={editorValue}
          hidden
          onChange={(e) => {
            setEditorValue(e.target.value)
            debouncedSubmit(e.target.form)
          }}
        />
      </ContentContainer>
    </Form>
  )
}
