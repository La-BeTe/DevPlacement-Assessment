import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Users from "./Users";
import {Select, MenuItem, FormControlLabel, Switch, FormControl} from "@material-ui/core";
import {useState} from "react";
import "./DashboardRight.css";

function DashboardRight(){
    const [country, setCountry] = useState("");
    const [input, setInput] = useState("");
    const [countrySelectVisible, setCountrySelectVisible] = useState(true);
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

            <Users />

            <div className="DashboardRight_footer">
                <div>
                    <a href="#" data-testid="download-results">
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