import './App.css';
import Projects from './components/projects/Projects'


function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>Project Tracker</h1>
      </header>
      <div className="project-container">
        <Projects/>
      </div>
    </div>
  );
}

export default App;
