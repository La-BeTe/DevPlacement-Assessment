import { render, screen, fireEvent } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import {
    results,
    resultsAfterChangingPage,
    resultsAfterChangingGender,
    resultsAfterChangingCountry,
} from "./testAPIResults";
import useFetch from "./useFetch";

const server = setupServer(
    rest.post("https://randomuser.me/api", (req, res, ctx) => {
        const page = req.url.searchParams.get("page");
        const gender = req.url.searchParams.get("gender");
        const country = req.url.searchParams.get("country");
        if (page) {
            res(ctx.json(JSON.stringify(resultsAfterChangingPage)));
        } else if (gender) {
            res(ctx.json(JSON.stringify(resultsAfterChangingGender)));
        } else if (country) {
            res(ctx.json(JSON.stringify(resultsAfterChangingCountry)));
        } else {
            res(ctx.json(JSON.stringify(results)));
        }
    })
);

const TestComponent = () => {
    const url = "https://randomuser.me/api?exc=login&results=5&seed=foobar";
    const {
        setFilter,
        users,
        downloadLink,
        currentUrl,
        loading,
        error,
    } = useFetch();
    return (
        <>
            {users.map((user) => (
                <p key={user.phone}>{user.name}</p>
            ))}
            <div data-testid="loading">{loading}</div>
            <div data-testid="error">{error}</div>
            <div data-testid="downloadLink">{downloadLink}</div>
            <div data-testid="currentUrl">{currentUrl}</div>
            <button onClick={() => setFilter("page", 1)}>Previous Page</button>
            <button onClick={() => setFilter("page", 2)}>Next Page</button>
            <button onClick={() => setFilter("gender", "female")}>
                Filter By Gender
            </button>
            <button onClick={() => setFilter("country", "gb")}>
                Filter By Country
            </button>
        </>
    );
};

test("should return default results if no filter provided", () => {
    render(<TestComponent />);
    expect(screen.getByText(/britney sims/i)).toBeInTheDocument();
    expect(screen.getByTestId("loading").innerText).toEqual("false");
});
