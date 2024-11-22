import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  todos = todos.filter(todo => todo.id !== id)
  return NextResponse.json({}, { status: 200 })
}
