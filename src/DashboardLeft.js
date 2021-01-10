import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import GroupSharpIcon from "@material-ui/icons/GroupSharp";
import { useState, useEffect } from "react";
import "./DashboardLeft.css";

function DashboardLeft({ setFilter: setUseFetchFilter, gender }) {
    const [currentFilter, setCurrentFilter] = useState("allUsers");

    useEffect(() => {
        document.querySelector(".filterBtn.active").classList.remove("active");
        document.getElementById(currentFilter).classList.add("active");
    }, [currentFilter]);

    function handleClick(id) {
        setCurrentFilter(id);
        setUseFetchFilter("gender", id.replace(/users/i, ""));
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
                <SearchRoundedIcon />
                <input type="text" placeholder="Find a user" />
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
                        <GroupSharpIcon />
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
                        <GroupSharpIcon />
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
                        <GroupSharpIcon />
                        <p>Female Users</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardLeft;
