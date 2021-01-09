import {render, screen, fireEvent} from "@testing-library/react";
import Users from "./Users";

const users = [
    {
        name: "Shalom Chioma",
        address: "9278 new road, kilcoole, waterford",
        email: "shalom.chioma@example.com",
        phoneNumber: "011-962-7516",
        photo: "/testImg.png"
    },
    {
        name: "Brad Gibson",
        address: "9278 old road, waterford",
        email: "brad.gibson@example.com",
        phoneNumber: "011-862-8236",
        photo: "/testImg.png"
    },
    {
        name: "Emeka Onuchukwu",
        address: "01, Allen Avenue",
        email: "emeka.onu@example.com",
        phoneNumber: "011-978-7501",
        photo: "/testImg.png"
    },
];

test("should take users array as props and render a list of users", ()=>{
    render(<Users users={users} />);
    const renderedUserElements = screen.getAllByTestId("user");
    expect(renderedUserElements).toHaveLength(3);
    renderedUserElements.forEach((elem, i)=>{
        expect(screen.getByText(users[i].name)).toBeInTheDocument();
        expect(screen.getByText(users[i].name)).toHaveClass("name");
    })
})

test("should render a single user if array has a length of 1", ()=>{
    render(<Users users={[users[0]]} />);
    const renderedUser = screen.getByTestId("user");
    expect(renderedUser).toHaveClass("User");
    expect(screen.getByText("Shalom Chioma")).toBeInTheDocument();
})

test("should render a single user if 'see more' button is clicked", ()=>{
    const showSingleUser = jest.fn();
    render(
        <Users
            users={users}
            showSingleUser={showSingleUser}
        />
    );
    const seeMore = screen.getAllByTestId("see-more");
    expect(screen.getAllByTestId("user")).toHaveLength(3);
    fireEvent.click(seeMore[0]);
    expect(showSingleUser).toBeCalledTimes(1);
    expect(showSingleUser).toHaveBeenCalledWith(users[0]);
})

test("should render all users if 'go back' button is clicked", ()=>{
    const hideSingleUser = jest.fn();
    render(
        <Users
            users={users.slice(0, 1)}
            hideSingleUser={hideSingleUser}
        />
    );
    expect(screen.getAllByTestId("user")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("go-back"));
    expect(hideSingleUser).toBeCalledTimes(1);
})