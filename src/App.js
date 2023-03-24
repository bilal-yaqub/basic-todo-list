import TodoList from "./TodoList";
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const LOCAL_STORAGE_KEY = 'todoApp'
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    if (storedTodos) setTodos(storedTodos)
  }, [])

  function handleOnClick(e) {
    let name = todoNameRef.current.value

    if (name === '') {
      return
    } else {
      setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
      })
    }

    todoNameRef.current.value = null
  }

  function toggleTodo(id) {
    const newTodos = [...todos]

    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)

    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />

      <input type='text' ref={todoNameRef}></input>
      <button onClick={handleOnClick}>Add Todo</button>
      <button onClick={clearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} Left</div>
    </>
  );
}

export default App;
