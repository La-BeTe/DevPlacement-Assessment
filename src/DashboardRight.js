import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {Select, MenuItem, FormControlLabel, Switch, FormControl} from "@material-ui/core";
import {useState} from "react";
import "./DashboardRight.css";

function DashboardRight(){
    const [country, setCountry] = useState("");
    const [countrySelectVisible, setCountrySelectVisible] = useState(true);
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
                        <input type="text" placeholder="Find a user" />
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
        </section>
    )
}

export default DashboardRight;