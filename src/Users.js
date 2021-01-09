import {Paper} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowLeftIcon from "@material-ui/icons/ArrowBackRounded";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import PhoneIcon from "@material-ui/icons/PhoneInTalkOutlined";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import "./Users.css";

function Users({users, showSingleUser, hideSingleUser}) {
    const user = users[0];
    return (
        <div className="Users">
            {
                users.length === 1
                    ?
                <div className="User" data-testid="user">
                    <div className="header" onClick={hideSingleUser} data-testid="go-back">
                        <ArrowLeftIcon />
                        RESULTS
                    </div>
                    <div>
                        <div className="img">
                            <img src={user.photo} alt={user.name + ".png"} />
                        </div>
                        <div className="details">
                            <p className="name-age">{user.name} <span className="age">{user.age}</span></p>
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
                    :
                users.map(user=>{
                    return (
                        <Paper key={user.phone} elevation={5} data-testid="user">
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
                            <div data-testid="see-more" onClick={()=> showSingleUser(user)}>
                                <ArrowRightIcon />
                            </div>
                        </Paper>
                    );
                })
            }
        </div>
    )
}

export default Users
