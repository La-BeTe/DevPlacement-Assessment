import {render, screen, fireEvent} from "@testing-library/react";
import DashboardLeft from "./DashboardLeft";

test("renders a greeting", ()=>{
    render(<DashboardLeft />);
    const greetingElement = screen.getByText(/Hello/i);
    const welcomeElement = screen.getByText(/welcome to your dashboard/i);
    expect(greetingElement).toBeInTheDocument();
    expect(welcomeElement).toBeInTheDocument();
})

test("adds active class to current users filter", ()=>{
    render(<DashboardLeft />);
    const maleUsersFilterButton = screen.getByTestId("male-users");
    const otherFilterButtons = screen.getAllByTestId("other-filters");
    fireEvent.click(maleUsersFilterButton);
    expect(maleUsersFilterButton).toHaveClass("active");
    otherFilterButtons.forEach(btn=>{
        expect(btn).not.toHaveClass("active");
    })
})