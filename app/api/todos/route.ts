import { NextResponse } from 'next/server'

interface Todo {
  id: number
  text: string
  createdAt: string
  folder: string
}

let todos: Todo[] = []
let nextId = 1

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder')
  
  if (folder) {
    return NextResponse.json(todos.filter(todo => todo.folder === folder))
  }
  
  return NextResponse.json(todos)
}

export async function POST(request: Request) {
  const { text, folder } = await request.json()
  const newTodo = { 
    id: nextId++, 
    text, 
    createdAt: new Date().toISOString(),
    folder: folder || 'Uncategorized'
  }
  todos.push(newTodo)
  return NextResponse.json(newTodo, { status: 201 })
}
