import ArrowLeftIcon from "@material-ui/icons/ArrowBackRounded";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";
import { useState } from "react";
import "./User.css";

function User({ user, hideSingleUser }) {
    const [exit, setExit] = useState(false);
    function hideUser() {
        setExit(true);
        setTimeout(hideSingleUser, 300);
    }
    return (
        <div className={exit ? "User exit" : "User enter"} data-testid="user">
            <div className="header" onClick={hideUser} data-testid="go-back">
                <ArrowLeftIcon />
                RESULTS
            </div>
            <div>
                <div className="img">
                    <img src={user.photo} alt={user.name + ".png"} />
                </div>
                <div className="details">
                    <p className="name-age">
                        {user.name} <span className="age">{user.age}</span>
                    </p>
                    <p className="address">{user.address}</p>
                    <p className="email badge">
                        <EmailIcon />
                        {user.email}
                    </p>
                    <p className="joined badge">JOINED: {user.registered}</p>
                    <p className="phone">
                        <PhoneIcon />
                        {user.phone}
                    </p>
                    <p className="mobile">
                        <PhoneAndroidIcon />
                        {user.mobile}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default User;
