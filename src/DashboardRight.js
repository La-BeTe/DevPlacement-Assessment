import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    FormControl,
} from "@material-ui/core";
import Users from "./Users";
import User from "./User";
import { useState, useEffect } from "react";
import "./DashboardRight.css";

function DashboardRight({
    fetchHookData: {
        setFilter,
        params: { page, gender, nat },
        data: { users, downloadLink },
        loading,
        error,
    },
}) {
    const [country, setCountry] = useState("");
    const [input, setInput] = useState("");
    const [countrySelectVisible, setCountrySelectVisible] = useState(true);
    const [singleUser, setSingleUser] = useState({});
    const [info, setInfo] = useState("");

    useEffect(() => {
        loading
            ? setInfo("Loading Users...")
            : error
            ? setInfo(error)
            : setInfo(false);
    }, [loading, error]);

    useEffect(() => {
        // Show all users if a new filter is selected
        setSingleUser({});
    }, [gender, nat, input]);

    function handleInputChange(e) {
        setInput(e.target.value);
    }
    function handleSelectChange(e) {
        setCountry(e.target.value);
        if (e.target.value) setFilter("nat", e.target.value);
    }
    function handleToggleChange() {
        setCountry("");
        setCountrySelectVisible(!countrySelectVisible);
    }

    return (
        <section className="DashboardRight">
            <div
                className={
                    info && loading
                        ? "info loading"
                        : info && error
                        ? "info error"
                        : "info"
                }
            >
                {info}{" "}
                <span className="close-info" onClick={() => setInfo("")}>
                    X
                </span>
            </div>
            <div className="DashboardRight_header">
                <h2>
                    {gender.replace(gender[0], gender[0].toUpperCase())} Users
                </h2>
                <p>Filter by</p>
                <div className="inputs">
                    <div>
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Find in list"
                            data-testid="input-field"
                        />
                    </div>
                    <FormControl id={countrySelectVisible ? "" : "hide"}>
                        <Select
                            value={country}
                            onChange={handleSelectChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                        >
                            <MenuItem value="">Country</MenuItem>
                            <MenuItem value="AU">Australia</MenuItem>
                            <MenuItem value="BR">Brazil</MenuItem>
                            <MenuItem value="CA">Canada</MenuItem>
                            <MenuItem value="CH">Switzerland</MenuItem>
                            <MenuItem value="DE">Germany</MenuItem>
                            <MenuItem value="DK">Denmark</MenuItem>
                            <MenuItem value="ES">Spain</MenuItem>
                            <MenuItem value="FI">Finland</MenuItem>
                            <MenuItem value="FR">France</MenuItem>
                            <MenuItem value="GB">UK</MenuItem>
                            <MenuItem value="IE">Ireland</MenuItem>
                            <MenuItem value="IR">Iran</MenuItem>
                            <MenuItem value="NO">Norway</MenuItem>
                            <MenuItem value="NL">Netherlands</MenuItem>
                            <MenuItem value="NZ">New Zealand</MenuItem>
                            <MenuItem value="TR">Turkey</MenuItem>
                            <MenuItem value="US">USA</MenuItem>
                        </Select>
                    </FormControl>

                    
                    {/* Use &nbsp; instead of space for label of FormControlLabel below to prevent a
                    break between show/hide and country */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={countrySelectVisible}
                                onChange={handleToggleChange}
                                color="default"
                            />
                        }
                        id={countrySelectVisible ? "" : "centerOnMobile"}
                        label={
                            <>
                                {countrySelectVisible ? "Hide" : "Show"}
                                &nbsp;Country
                            </>
                        }
                    />
                </div>
            </div>

            {singleUser.name ? (
                <User
                    user={singleUser}
                    hideSingleUser={() => setSingleUser({})}
                />
            ) : (
                <Users
                    users={users.filter((user) =>
                        new RegExp(input, "i").test(user.name)
                    )}
                    showSingleUser={(user) => setSingleUser(user)}
                />
            )}

            <div
                className={
                    singleUser.name
                        ? "DashboardRight_footer showing-single-user"
                        : "DashboardRight_footer"
                }
            >
                <div>
                    <a
                        href={downloadLink}
                        download
                        data-testid="download-results"
                    >
                        <CloudDownloadIcon />
                        <span className="text">Download results</span>
                    </a>
                </div>
                <div data-testid="pagination">
                    <ArrowBackIosIcon
                        onClick={() => page > 1 && setFilter("page", page - 1)}
                        className={page === 1 ? "disabled" : ""}
                    />
                    <ArrowForwardIosIcon
                        onClick={() => setFilter("page", page + 1)}
                    />
                </div>
            </div>
        </section>
    );
}

export default DashboardRight;
