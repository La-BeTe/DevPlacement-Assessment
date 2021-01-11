import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardRight from "./DashboardRight";

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
const gender = "all";
const downloadLink = "/testlink";

test("renders a heading", () => {
    const { rerender } = render(
        <DashboardRight fetchHookData={{ gender, users }} />
    );
    expect(screen.getByText(/all users/i)).toBeInTheDocument();
    const newGender = "male";
    rerender(<DashboardRight fetchHookData={{ gender: newGender, users }} />);
    expect(screen.getByText(/male users/i)).toBeInTheDocument();
});

test("filters users in list based on value of input field", () => {
    render(<DashboardRight fetchHookData={{ users, gender }} />);
    expect(screen.getAllByTestId("user")).toHaveLength(3);
    const inputField = screen.getByTestId("input-field");
    userEvent.type(inputField, "brad");
    expect(screen.getAllByTestId("user")).toHaveLength(1);
});

test("calls filter function with specified country", () => {
    const setFilter = jest.fn();
    render(<DashboardRight fetchHookData={{ setFilter, gender, users }} />);
    const countrySelectField = screen.getByRole("button");
    fireEvent.mouseDown(countrySelectField);
    const listBox = within(screen.getByRole("listbox"));
    fireEvent.click(listBox.getByText("UK"));
    expect(setFilter).toHaveBeenCalledWith("nat", "GB");
});

test("renders a footer containing pagination and anchor tag", () => {
    render(<DashboardRight fetchHookData={{ gender, users, downloadLink }} />);
    const linkElement = screen.getByTestId("download-results");
    const pagination = screen.getByTestId("pagination");
    expect(linkElement).toHaveAttribute("href");
    expect(pagination).toBeInTheDocument();
});
