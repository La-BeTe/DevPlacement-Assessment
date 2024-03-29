import { Paper } from "@material-ui/core";
import { useState } from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardRounded";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";
import Blink from "./Blink";
import "./Users.css";

function Users({ users, showSingleUser }) {
    const [exit, setExit] = useState(false);
    function showUser(user) {
        setExit(true);
        setTimeout(() => showSingleUser(user), 200);
    }
    return (
        <div
            className={exit ? "Users exit" : "Users enter"}
            data-testid="users"
        >
            {users.map((user, i) => {
                return (
                    <Paper
                        key={user.id + String(i)}
                        elevation={5}
                        data-testid="user"
                    >
                        <div className="img">
                            <img src={user.photo} alt={user.name + ".png"} />
                        </div>
                        <div className="details">
                            <p className="name">
                                <Blink text={user.name} />
                            </p>
                            <p className="address">
                                <Blink text={user.address} />
                            </p>
                            <div>
                                <p>
                                    <EmailIcon />
                                    <Blink text={user.email} />
                                </p>
                                <p>
                                    <PhoneIcon />
                                    <Blink text={user.phone} />
                                </p>
                            </div>
                        </div>
                        <div
                            data-testid="see-more"
                            onClick={() => showUser(user)}
                        >
                            <ArrowRightIcon />
                        </div>
                    </Paper>
                );
            })}
        </div>
    );
}

export default Users;
