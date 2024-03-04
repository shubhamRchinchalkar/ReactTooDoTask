import React, {useState} from 'react'
import './todo.css'

const TodoApp = () => {
    const [todos , setTodos] = useState([]);
    const [taskName , setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Not Completed');
    const [filterStatus , setFilterStatus] = useState('All');

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const addTodo = () => {
        if(taskName.trim() !== ''){
            const newTodo = {
                id : todos.length + 1,
                taskName,
                description,
                status
            }
            setTodos([...todos, newTodo]);
            setTaskName('');
            setDescription('');
            setStatus('Not completed');
        }
    };

    const deleteTodo = (id) => {
       const updatedTodos = todos.filter((todo) => todo.id !== id);
       setTodos(updatedTodos)
    }

    const updateStatus = (id, newStatus) => {
        const updatedTodos = todos.map((todo) => 
        todo.id === id ? {...todo, status : newStatus} : todo
         );
         setTodos(updatedTodos)
    }

    const filterTodos = (statusFilter) => {
        setFilterStatus(statusFilter);
    }

    const filteredTodos = filterStatus === 'All' ? todos : todos.filter((todo) => todo.status === filterStatus)

    return(
        <div className='main-container'>
            <h2 className='todo-heading'>My Todo</h2>
            <div>
                <input className='task-container' type='text' placeholder='Task Name' value={taskName} onChange={handleTaskNameChange} />
                <input className='description-container' type='text' placeholder='Description' value={description} onChange={handleDescriptionChange} />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                </select>
                <button className='todo-button' onClick={addTodo}>Add Todo</button>
            </div>
            <div className='status-container'>
                Status Filter:
                <button className='button-all' onClick={() => filterTodos('All')}>All</button>
                <button className='button-completed' onClick={() => filterTodos('Completed')}>Completed</button>
                <button className='button-incomplete' onClick={() => filterTodos('Not Completed')}>Not Completed</button>
            </div>
            <div>
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className='todo-container'>
                        <h3 className='todo-name'>{todo.taskName}</h3>
                        <p className='todo-description'>{todo.description}</p>
                        <p className='todo-description'>
                            Status : 
                            {todo.status === 'Not Completed' ? (
                                <select value={todo.status} onChange={(e) => updateStatus(todo.id, e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Not Completed">Not Completed</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            ) : (<span>{todo.status}</span>)}
                        </p>
                        <button className='delete-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoApp