import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import './Dropdown.css';
import Column from './Column';

function App() {
  const defaultUserState = {
    username: 'user'
  };
  sessionStorage.setItem('userState', JSON.stringify(defaultUserState));
  const storedUserState = sessionStorage.getItem('userState');
  const [userState, setUserState] = useState(storedUserState ? JSON.parse(storedUserState) : defaultUserState);

  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [tasks, setTasks] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [columns, setColumns] = useState([]); 
  useEffect(() => {

    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTasks(data.tickets); 
        setUsers(data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  // console.log('api data:', users);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setColumns(generateColumns(option));
  }

  const generateColumns = (option) => {
    switch (option) {
      case 'Status':
        return generateStatusColumns();
      case 'User':
        return generateUserColumns();
      case 'Priority':
        return generatePriorityColumns();
      //   return tasks.sort((a, b) => a.priority - b.priority);
      default:
        return null;
        // return tasks.filter(task => task.status === 'completed');
    }
  }
 
  const generateStatusColumns = () => {
    const uniqueStatuses = [...new Set(tasks.map(task => task.status))];
    return uniqueStatuses.map(status => (
      <Column key={status} title={status} tasks={tasks.filter(task => task.status === status).sort((a, b) => b.priority - a.priority)} />
    ));
  }

  const generateUserColumns = () => {
    return users.map(user => (
      <Column key={user.id} title={user.name} tasks={tasks.filter(task => task.userId === user.id).sort((a, b) => b.priority - a.priority)} />
    ));
  }

  const generatePriorityColumns = () => {
    const uniquePriorities = [...new Set(tasks.map(task => task.priority))];
    return uniquePriorities.map(priority => (
      <Column key={priority} title={priorityLabels[priority]} tasks={tasks.filter(task => task.priority === priority).sort((a, b) => b.priority - a.priority)} />
    ));
  }
  

  return (    
    <div className="App">

      <div className="kanban-board">
          {/* {generateColumns()} */}
          {columns}
      </div>
      <Dropdown onOptionSelect={handleOptionSelect}/>
    </div>
  );
}

export default App;
