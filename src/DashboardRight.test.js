import {render, screen} from "@testing-library/react";
import DashboardRight from "./DashboardRight";

test("renders a heading", ()=>{
    render(<DashboardRight />);
    expect(screen.getByText(/users/i)).toBeInTheDocument();
})