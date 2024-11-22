import TodoList from '@/components/TodoList'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List with Folders</h1>
      <TodoList />
    </main>
  )
}
