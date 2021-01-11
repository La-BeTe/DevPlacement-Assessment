// import logo from './logo.svg';
import DashboardLeft from "./DashboardLeft";
import DashboardRight from "./DashboardRight";
import useFetch from "./useFetch";
import "./App.css";

function App() {
    const fetchHookData = useFetch();
    return (
        <div className="App">
            <DashboardLeft
                setFilter={fetchHookData.setFilter}
                gender={fetchHookData.params.gender}
            />
            <DashboardRight fetchHookData={fetchHookData} />
        </div>
    );
}

export default App;
