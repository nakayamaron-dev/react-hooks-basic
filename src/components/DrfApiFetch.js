import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const DrfApiFetch = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const [editedTask, setEdetedTask] = useState({id: '', title: ''})
    const [id, setId] = useState(1)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/', {
            headers: {
                'Authorization': 'Token 16765a059804bf87c2b667ef9245f09982fbe50a'
            }
        })
        .then(res => {setTasks(res.data)})
    }, [])

    const getTask = () => {
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
                'Authorization': 'Token 16765a059804bf87c2b667ef9245f09982fbe50a'
            }
        }).then(res => {setSelectedTask(res.data)})
    }

    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
                'Authorization': 'Token 16765a059804bf87c2b667ef9245f09982fbe50a'
            }
        }).then(res => {
            setTasks(tasks.filter(task => task.id !== id)); 
            setSelectedTask([])

            /*ここから3行追加*/
            if (editedTask.id === id) {
                setEdetedTask({ id: "", title: "" });
              }
        })
    }

    const newTask = (task) => {
        const data = {
            title: task.title
        }

        axios.post(`http://127.0.0.1:8000/api/tasks/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 16765a059804bf87c2b667ef9245f09982fbe50a'
            }
        }).then(res => {
            setTasks([...tasks, res.data]);
            setEdetedTask({id: '', title: ''})
        })
    }

    const editTask = (task) => {
        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 16765a059804bf87c2b667ef9245f09982fbe50a'
            }
        }).then(res => {
            setTasks(tasks.map(task => (task.id === editedTask.id? res.data: task)));
            setEdetedTask({id: '', title: ''})
        })
    }

    const handleInputChange = () => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEdetedTask({...editedTask, [name]:value})
    }

    return (
        <div>
            <ul>
                {
                    tasks.map(
                        task => 
                    <li key={task.id}> {task.title} {task.id}
                    <button onClick={()=>deleteTask(task.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button onClick={()=>setEdetedTask(task)}>
                        <i className="fas fa-pen"></i>
                    </button>
                    </li>
                    )
                }
            </ul>

            Set id <br />
            <input type='text' value={id} onChange={evt=>{setId(evt.target.value)}} />
            <br />
            <button type='button' onClick={() => getTask()}>Get task</button>
            {/* <button type='button' onClick={() => deleteTask()}>Delete task</button> */}

            <h3>{selectedTask.title} {selectedTask.id}</h3>

            <input type='text' name='title' 
            value={editedTask.title}
            onChange={handleInputChange()}
            placeholder="New task ?" required />

            {editedTask.id ?
            <button onClick={() => editTask(editedTask)}>Update</button>:
            <button onClick={() => newTask(editedTask)}>Create</button> }
        </div>
    )
}
