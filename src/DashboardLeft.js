import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMale,
    faFemale,
    faUsers,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./DashboardLeft.css";

function DashboardLeft({ setFilter: setUseFetchFilter, gender }) {
    // const [currentFilter, setCurrentFilter] = useState("allUsers");
    const [input, setInput] = useState("");

    // useEffect(() => {
    //     document.querySelector(".filterBtn.active").classList.remove("active");
    //     document.getElementById(currentFilter).classList.add("active");
    // }, [currentFilter]);

    function handleClick(id) {
        // setCurrentFilter(id);
        setUseFetchFilter("gender", id.replace(/users/i, ""));
    }

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    return (
        <section className="DashboardLeft">
            <div className="DashboardLeft_greeting">
                <p>
                    Hello, <span className="name">Emerald</span>
                </p>
                <p>
                    Welcome to your dashboard, kindly sort through the user base
                </p>
            </div>
            <div className="DashboardLeft_input">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    type="text"
                    placeholder="Find a user"
                    value={input}
                    onChange={handleInputChange}
                />
            </div>
            <div className="DashboardLeft_filterBtns">
                <p>Show Users</p>
                <div>
                    <div
                        onClick={() => handleClick("allUsers")}
                        data-testid="other-filters"
                        className={
                            gender === "all" ? "filterBtn active" : "filterBtn"
                        }
                        id="allUsers"
                    >
                        <FontAwesomeIcon icon={faUsers} />
                        <p>All Users</p>
                    </div>
                    <div
                        onClick={() => handleClick("maleUsers")}
                        data-testid="male-users"
                        className={
                            gender === "male" ? "filterBtn active" : "filterBtn"
                        }
                        id="maleUsers"
                    >
                        <FontAwesomeIcon icon={faMale} />
                        <p>Male Users</p>
                    </div>
                    <div
                        onClick={() => handleClick("femaleUsers")}
                        data-testid="other-filters"
                        className={
                            gender === "female"
                                ? "filterBtn active"
                                : "filterBtn"
                        }
                        id="femaleUsers"
                    >
                        <FontAwesomeIcon icon={faFemale} />
                        <p>Female Users</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardLeft;
