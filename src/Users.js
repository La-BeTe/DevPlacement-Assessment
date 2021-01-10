import { Paper } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowLeftIcon from "@material-ui/icons/ArrowBackRounded";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import { CSSTransition } from "react-transition-group";
import "./Users.css";

function Users({ users, showSingleUser, hideSingleUser, loading }) {
    // boolean, true only if currently on a single user account
    const showingSingleUser =
        !Array.isArray(users) && typeof users === "object";
    return (
        <CSSTransition
            timeout={500}
            classNames="users-transitions"
            in={showingSingleUser}
        >
            <div className="Users">
                {showingSingleUser ? (
                    <div className="User" data-testid="user">
                        <div
                            className="header"
                            onClick={hideSingleUser}
                            data-testid="go-back"
                        >
                            <ArrowLeftIcon />
                            RESULTS
                        </div>
                        <div>
                            <div className="img">
                                <img
                                    src={users.photo}
                                    alt={users.name + ".png"}
                                />
                            </div>
                            <div className="details">
                                <p className="name-age">
                                    {users.name}{" "}
                                    <span className="age">{users.age}</span>
                                </p>
                                <p className="address">{users.address}</p>
                                <p className="email badge">
                                    <EmailIcon />
                                    {users.email}
                                </p>
                                <p className="joined badge">
                                    JOINED: {users.registered}
                                </p>
                                <p className="phone">
                                    <PhoneIcon />
                                    {users.phone}
                                </p>
                                <p className="mobile">
                                    <PhoneAndroidIcon />
                                    {users.mobile}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    users.map((user, i) => {
                        return (
                            <Paper
                                key={user.id}
                                elevation={5}
                                data-testid="user"
                            >
                                <div className="img">
                                    <img
                                        src={user.photo}
                                        alt={user.name + ".png"}
                                    />
                                </div>
                                <CSSTransition
                                    timeout={1000}
                                    classNames="user-details"
                                    in={loading}
                                    appear
                                >
                                    <div className="details">
                                        <p className="name">{user.name}</p>
                                        <p className="address">
                                            {user.address}
                                        </p>
                                        <div>
                                            <p>
                                                <EmailIcon />
                                                {user.email}
                                            </p>
                                            <p>
                                                <PhoneIcon />
                                                {user.phone}
                                            </p>
                                        </div>
                                    </div>
                                </CSSTransition>
                                <div
                                    data-testid="see-more"
                                    onClick={() => showSingleUser(user)}
                                >
                                    <ArrowRightIcon />
                                </div>
                            </Paper>
                        );
                    })
                )}
            </div>
        </CSSTransition>
    );
}

export default Users;
