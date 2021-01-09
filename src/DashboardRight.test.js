import {render, screen} from "@testing-library/react";
import DashboardRight from "./DashboardRight";

test("renders a heading", ()=>{
    render(<DashboardRight />);
    expect(screen.getByText(/all users/i)).toBeInTheDocument();
});

test("renders a footer containing pagination and anchor tag", ()=>{
    render(<DashboardRight />);
    const linkElement = screen.getByTestId("download-results");
    const pagination = screen.getByTestId("pagination");
    expect(linkElement).toHaveAttribute("href");
    expect(pagination).toBeInTheDocument();
})