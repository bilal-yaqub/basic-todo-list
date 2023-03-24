import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>
                <input type={'checkbox'} onClick={handleTodoClick} checked={todo.completed}></input>
                {todo.name}
            </label>
        </div>
    )
}
