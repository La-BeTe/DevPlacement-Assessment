// import logo from './logo.svg';
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import './App.css';


function App() {
  /*
   * Filter Users
   *
   * @param field - The field to filter on
   * 
   * @param value - Value to use for filtering
   * 
   * This function sets the users state in App.js based on the filterObj and will fetch from the api if 
   */
  function filterUsers(){}
  return (
    <div className="App">
      <DashboardLeft filterUsers={filterUsers} />
      <DashboardRight />
    </div>
  );
}

export default App;
