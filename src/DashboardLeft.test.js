import { render, screen, fireEvent } from "@testing-library/react";
import DashboardLeft from "./DashboardLeft";

test("renders a greeting", () => {
    render(<DashboardLeft />);
    const greetingElement = screen.getByText(/Hello/i);
    const welcomeElement = screen.getByText(/welcome to your dashboard/i);
    expect(greetingElement).toBeInTheDocument();
    expect(welcomeElement).toBeInTheDocument();
});

test("adds active class to current users filter with the passed in gender", () => {
    render(<DashboardLeft gender="male" />);
    const maleUsersFilterButton = screen.getByTestId("male-users");
    expect(maleUsersFilterButton).toHaveClass("active");
    const otherFilterButtons = screen.getAllByTestId("other-filters");
    otherFilterButtons.forEach((btn) => {
        expect(btn).not.toHaveClass("active");
    });
});

test("calls filter function with gender", () => {
    const setFilter = jest.fn();
    render(<DashboardLeft setFilter={setFilter} />);
    const maleUsersFilterButton = screen.getByTestId("male-users");
    const otherFilterButtons = screen.getAllByTestId("other-filters");
    fireEvent.click(maleUsersFilterButton);
    expect(setFilter).toHaveBeenCalledWith("gender", "male");
    for (const btn of otherFilterButtons) {
        fireEvent.click(btn);
        expect(setFilter).toHaveBeenCalledWith(
            "gender",
            btn.id.replace(/users/i, "")
        );
    }
    expect(setFilter).toHaveBeenCalledTimes(3);
});
