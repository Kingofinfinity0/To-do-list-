'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Todo {
  id: number
  text: string
  createdAt: string
  folder: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [currentFolder, setCurrentFolder] = useState('Uncategorized')
  const [folders, setFolders] = useState<string[]>(['Uncategorized'])
  const [newFolder, setNewFolder] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [currentFolder])

  const fetchTodos = async () => {
    const response = await fetch(`/api/todos?folder=${currentFolder}`)
    const data = await response.json()
    setTodos(data)
  }

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo, folder: currentFolder }),
      })
      const todo = await response.json()
      setTodos([...todos, todo])
      setNewTodo('')
    }
  }

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const addFolder = () => {
    if (newFolder.trim() !== '' && !folders.includes(newFolder)) {
      setFolders([...folders, newFolder])
      setNewFolder('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
          placeholder="New folder name"
          className="flex-grow"
        />
        <Button onClick={addFolder}>Add Folder</Button>
      </div>
      <Select value={currentFolder} onValueChange={setCurrentFolder}>
        <SelectTrigger>
          <SelectValue placeholder="Select a folder" />
        </SelectTrigger>
        <SelectContent>
          {folders.map(folder => (
            <SelectItem key={folder} value={folder}>{folder}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Card>
        <CardHeader>
          <CardTitle>{currentFolder} Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {todos.map(todo => (
              <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                <div>
                  <span className="font-medium">{todo.text}</span>
                  <br />
                  <span className="text-sm text-gray-500">
                    Created: {new Date(todo.createdAt).toLocaleString()}
                  </span>
                </div>
                <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
