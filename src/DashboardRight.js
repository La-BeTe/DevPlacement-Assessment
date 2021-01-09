import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Users from "./Users";
import {Select, MenuItem, FormControlLabel, Switch, FormControl} from "@material-ui/core";
import {useState} from "react";
import "./DashboardRight.css";

const users = [
    {
        name: "Shalom Chioma",
        address: "9278 new road, kilcoole, waterford",
        email: "shalom.chioma@example.com",
        phone: "011-962-7516",
        mobile: "011-978-7501",
        age: 26,
        registered: "2020-15-12",
        photo: "/testImg.png"
    },
    {
        name: "Brad Gibson",
        address: "9278 old road, waterford",
        email: "brad.gibson@example.com",
        phone: "011-862-8236",
        mobile: "011-862-8236",
        age: 26,
        registered: "2020-15-12",
        photo: "/testImg.png"
    },
    {
        name: "Emeka Onuchukwu",
        address: "01, Allen Avenue",
        email: "emeka.onu@example.com",
        phone: "011-978-7501",
        mobile: "011-978-7501",
        age: 26,
        registered: "2020-15-12",
        photo: "/testImg.png"
    },
];

function DashboardRight(){
    const [country, setCountry] = useState("");
    const [input, setInput] = useState("");
    const [countrySelectVisible, setCountrySelectVisible] = useState(true);
    const [singleUser, setSingleUser] = useState({});

    function handleInputChange(e){
        setInput(e.target.value);
    }
    function handleSelectChange(e){
        setCountry(e.target.value);
    }
    function handleToggleChange(e){
        setCountrySelectVisible(!countrySelectVisible);
    }

    return (
        <section className="DashboardRight">
            <div className="DashboardRight_header">
                <h2>All Users</h2>
                <p>Filter by</p>
                <div className="inputs">
                    <div>
                        <SearchRoundedIcon />
                        <input type="text" value={input} onChange={handleInputChange} placeholder="Find a user" />
                    </div>
                    <FormControl id={countrySelectVisible ? "" : "hide"}>
                        <Select
                        value={country}
                        onChange={handleSelectChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">Country</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={countrySelectVisible}
                                onChange={handleToggleChange}
                                color="default"
                            />
                        }
                        label="Show&nbsp;Country"
                    />
                </div>
            </div>

            <Users
                users={singleUser.name ? [singleUser] : users}
                showSingleUser={(user)=> setSingleUser(user)}
                hideSingleUser={()=> setSingleUser({})}
            />

            <div className={singleUser.name ? "DashboardRight_footer showing-single-user" : "DashboardRight_footer"}>
                <div>
                    <a href="/" data-testid="download-results">
                        <CloudDownloadIcon />
                        <span className="text">Download results</span>
                    </a>
                </div>
                <div data-testid="pagination">
                    <ArrowBackIosIcon className="disabled" />
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </section>
    )
}

export default DashboardRight;