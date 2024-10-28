import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TaskCreator from './components/TaskCreator';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        <Register />
        <Login />
        <TaskCreator />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
