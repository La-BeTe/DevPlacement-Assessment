import { render, screen, fireEvent } from "@testing-library/react";
import User from "./User";

const user = {
    name: "Shalom Chioma",
    address: "9278 new road, kilcoole, waterford",
    email: "shalom.chioma@example.com",
    phone: "011-962-7516",
    photo: "/testImg.png",
};

jest.useFakeTimers();

test("should render a single user", () => {
    render(<User user={user} />);
    const renderedUser = screen.getByTestId("user");
    expect(renderedUser).toHaveClass("User");
    expect(screen.getByText(/shalom chioma/i)).toBeInTheDocument();
    expect(
        screen.getByText("9278 new road, kilcoole, waterford")
    ).toBeInTheDocument();
    expect(screen.getByText("shalom.chioma@example.com")).toBeInTheDocument();
});

test("should have exit class immediately 'go back' button is clicked", () => {
    const hideSingleUser = jest.fn();
    render(<User user={user} hideSingleUser={hideSingleUser} />);
    const renderedUser = screen.getByTestId("user");
    expect(renderedUser).toHaveClass("enter");
    const goBackBtn = screen.getByTestId("go-back");
    fireEvent.click(goBackBtn);
    expect(renderedUser).toHaveClass("exit");
});

test("should wait for 300ms before hiding user if 'go back' button is clicked", () => {
    const hideSingleUser = jest.fn();
    render(<User user={user} hideSingleUser={hideSingleUser} />);
    const goBackBtn = screen.getByTestId("go-back");
    fireEvent.click(goBackBtn);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(hideSingleUser, 200);
});
