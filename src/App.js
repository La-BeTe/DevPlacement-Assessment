// import logo from './logo.svg';
import DashboardLeft from "./DashboardLeft";
import './App.css';


function App() {
  function filterUsers(){}
  return (
    <div className="App">
      <DashboardLeft filterUsers={filterUsers} />
    </div>
  );
}

export default App;
