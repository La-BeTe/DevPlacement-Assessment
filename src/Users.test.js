import { render, screen, fireEvent } from "@testing-library/react";
import Users from "./Users";

const users = [
    {
        name: "Shalom Chioma",
        address: "9278 new road, kilcoole, waterford",
        email: "shalom.chioma@example.com",
        phone: "011-962-7516",
        photo: "/testImg.png",
    },
    {
        name: "Brad Gibson",
        address: "9278 old road, waterford",
        email: "brad.gibson@example.com",
        phone: "011-862-8236",
        photo: "/testImg.png",
    },
    {
        name: "Emeka Onuchukwu",
        address: "01, Allen Avenue",
        email: "emeka.onu@example.com",
        phone: "011-978-7501",
        photo: "/testImg.png",
    },
];

jest.useFakeTimers();

test("should take users array as props and render a list of users", () => {
    render(<Users users={users} />);
    const renderedUserElements = screen.getAllByTestId("user");
    expect(renderedUserElements).toHaveLength(3);
    renderedUserElements.forEach((elem, i) => {
        expect(screen.getByText(users[i].name)).toBeInTheDocument();
        expect(screen.getByText(users[i].name)).toHaveClass("name");
    });
});

test("should have exit class immediately 'see more' button is clicked", () => {
    const showSingleUser = jest.fn();
    render(<Users users={users} showSingleUser={showSingleUser} />);
    const renderedUsers = screen.getByTestId("users");
    expect(renderedUsers).toHaveClass("enter");
    const seeMoreBtn = screen.getAllByTestId("see-more")[0];
    fireEvent.click(seeMoreBtn);
    expect(renderedUsers).toHaveClass("exit");
});

test("should wait for 300ms before showing user if 'see more' button is clicked", () => {
    const showSingleUser = jest.fn();
    render(<Users users={users} showSingleUser={showSingleUser} />);
    const seeMoreBtn = screen.getAllByTestId("see-more")[0];
    fireEvent.click(seeMoreBtn);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200);
});
