import { Paper } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardRounded";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";
import "./Users.css";

function Users({ users, showSingleUser }) {
    return (
        <div className="Users">
            {users.map((user, i) => {
                return (
                    <Paper key={user.id} elevation={5} data-testid="user">
                        <div className="img">
                            <img src={user.photo} alt={user.name + ".png"} />
                        </div>
                        <div className="details">
                            <p className="name">{user.name}</p>
                            <p className="address">{user.address}</p>
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
                        <div
                            data-testid="see-more"
                            onClick={() => showSingleUser(user)}
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
