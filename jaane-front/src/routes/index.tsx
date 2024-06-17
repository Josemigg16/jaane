import { component$, useSignal } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city"

interface ListItem {
  text: string
}

export const list: ListItem[] = []

export const useListLoader = routeLoader$(() => {
  return list
})

export const useAddTaskAction = routeAction$(
  (item) => {
    list.push(item)
    return {
      success: true,
    }
  },
  zod$({
    text: z.string(),
  })
)

export default component$(() => {
  const list = useListLoader()
  const action = useAddTaskAction()
  return (
    <>
      <h1>Hello world, this a to do to begin</h1>
      <Form action={action} spaReset>
        <input type="text" name="task" placeholder="Enter task" />
        <button type="submit">Add task</button>
      </Form>
    </>
  )
})

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
}
