import { Form, useLoaderData, useSubmit } from 'react-router-dom'
import './style.scss'

export const Content = () => {
  const { content, categories } = useLoaderData() as {
    content: ContentType
    categories: CategoryType[]
  }
  const submit = useSubmit()

  return (
    <Form method="PUT">
      <main className="content-page" key={content.id}>
        <input
          name="title"
          type="text"
          autoFocus
          defaultValue={content.title}
          onChange={(e) => {
            submit(e.target.form)
          }}
        />
        <select
          name="category_id"
          value={content.category_id}
          onChange={(e) => submit(e.target.form)}
        >
          <option value="0">未分類</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          name="content"
          placeholder="請輸入內容..."
          defaultValue={content.content}
          onChange={(e) => {
            submit(e.target.form)
          }}
        />
      </main>
    </Form>
  )
}
