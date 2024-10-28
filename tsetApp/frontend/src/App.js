import React from 'react';
import Register from './Register';
import Login from './Login';
import TaskCreator from './TaskCreator';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
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
