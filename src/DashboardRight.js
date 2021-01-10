import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Users from "./Users";
import {
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    FormControl,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import "./DashboardRight.css";

// const users = [
//     {
//         name: "Shalom Chioma",
//         address: "9278 new road, kilcoole, waterford",
//         email: "shalom.chioma@example.com",
//         phone: "011-962-7516",
//         mobile: "011-978-7501",
//         age: 26,
//         registered: "2020-15-12",
//         photo: "/testImg.png"
//     },
//     {
//         name: "Brad Gibson",
//         address: "9278 old road, waterford",
//         email: "brad.gibson@example.com",
//         phone: "011-862-8236",
//         mobile: "011-862-8236",
//         age: 26,
//         registered: "2020-15-12",
//         photo: "/testImg.png"
//     },
//     {
//         name: "Emeka Onuchukwu",
//         address: "01, Allen Avenue",
//         email: "emeka.onu@example.com",
//         phone: "011-978-7501",
//         mobile: "011-978-7501",
//         age: 26,
//         registered: "2020-15-12",
//         photo: "/testImg.png"
//     },
// ];

function DashboardRight({
    fetchHookData: {
        setFilter,
        page,
        users,
        downloadLink,
        loading,
        error,
        gender,
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

    function handleInputChange(e) {
        setInput(e.target.value);
    }
    function handleSelectChange(e) {
        setCountry(e.target.value);
        if (e.target.value) setFilter("nat", e.target.value);
    }
    function handleToggleChange(e) {
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
                        <SearchRoundedIcon />
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Find a user"
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
                    <FormControlLabel
                        control={
                            <Switch
                                checked={countrySelectVisible}
                                onChange={handleToggleChange}
                                color="default"
                            />
                        }
                        label={
                            countrySelectVisible
                                ? "Hide Country"
                                : "Show Country"
                        }
                    />
                </div>
            </div>

            <Users
                users={
                    singleUser.name
                        ? singleUser
                        : users.filter((user) =>
                              new RegExp(input, "i").test(user.name)
                          )
                }
                showSingleUser={(user) => setSingleUser(user)}
                hideSingleUser={() => setSingleUser({})}
            />

            <div
                className={
                    singleUser.name
                        ? "DashboardRight_footer showing-single-user"
                        : "DashboardRight_footer"
                }
            >
                <div>
                    <a href={downloadLink} data-testid="download-results">
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
