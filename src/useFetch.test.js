import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    rest.get("https://randomuser.me/api", (req, res, ctx) => {
        const page = req.url.searchParams.get("page");
        const gender = req.url.searchParams.get("gender");
        const country = req.url.searchParams.get("nat");
        if (country === "GB") {
            return res(ctx.json(resultsAfterChangingCountry));
        } else if (gender === "female") {
            return res(ctx.json(resultsAfterChangingGender));
        } else if (page === "2") {
            return res(ctx.json(resultsAfterChangingPage));
        } else {
            return res(ctx.json(results));
        }
    })
);

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
});
afterAll(() => server.close());

const TestComponent = () => {
    const {
        setFilter,
        data: { users, downloadLink },
        loading,
        error,
        retryLastRequest,
    } = useFetch();
    return (
        <>
            {users.map((user) => (
                <p data-testid="user" key={user.id}>
                    {user.name}
                </p>
            ))}
            <div data-testid="loading">{loading.toString()}</div>
            <div data-testid="error">{error}</div>
            <div data-testid="downloadLink">{downloadLink}</div>
            <button
                data-testid="reset"
                onClick={() => setFilter("uselessFilter", 2)}
            >
                Reset useFetch to default filters
            </button>
            <button onClick={() => setFilter("page", 2)}>Next Page</button>
            <button onClick={() => setFilter("gender", "female")}>
                Filter By Female Gender
            </button>
            <button onClick={() => setFilter("nat", "GB")}>Filter By UK</button>
            <button onClick={retryLastRequest}>Retry request</button>
        </>
    );
};

test("should return default results if no filter is provided", async () => {
    render(<TestComponent />);
    const users = await waitFor(() => screen.getAllByTestId("user"));
    expect(users).toHaveLength(5);
    users.forEach((user, i) => {
        let name =
            results.results[i].name.first + " " + results.results[i].name.last;
        expect(user).toHaveTextContent(name);
    });
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("error")).toBeEmptyDOMElement();
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});

test("should return new page of results if filter is set to a new page", async () => {
    render(<TestComponent />);
    await screen.findAllByTestId("user");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    fireEvent.click(screen.getByText(/next page/i));
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    await screen.findByText(/avery harris/i);
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    const users = await screen.findAllByTestId("user");
    users.forEach((user, i) => {
        let name =
            resultsAfterChangingPage.results[i].name.first +
            " " +
            resultsAfterChangingPage.results[i].name.last;
        expect(user).toHaveTextContent(name);
    });
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});

test("should return users with a different gender if gender filter is changed", async () => {
    render(<TestComponent />);
    await screen.findAllByTestId("user");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    fireEvent.click(screen.getByText(/filter by female gender/i));
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    await screen.findByText(/imogen edwards/i);
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    const users = await screen.findAllByTestId("user");
    users.forEach((user, i) => {
        let name =
            resultsAfterChangingGender.results[i].name.first +
            " " +
            resultsAfterChangingGender.results[i].name.last;
        expect(user).toHaveTextContent(name);
    });
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});

test("should return users in a different country if country filter is changed", async () => {
    render(<TestComponent />);
    await screen.findAllByTestId("user");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    fireEvent.click(screen.getByText(/filter by uk/i));
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
    await screen.findByText(/becky sims/i);
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    const users = await screen.findAllByTestId("user");
    users.forEach((user, i) => {
        let name =
            resultsAfterChangingCountry.results[i].name.first +
            " " +
            resultsAfterChangingCountry.results[i].name.last;
        expect(user).toHaveTextContent(name);
    });
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});

test("should set error string if API return an error", async () => {
    server.use(
        rest.get("https://randomuser.me/api", (req, res, ctx) => {
            return res(ctx.json({ error: "Uh oh an error occurred" }));
        })
    );
    render(<TestComponent />);
    expect(
        await screen.findByText(/server error occurr?ed/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});

test("should retry a previous failed request with the exact same params", async () => {
    render(<TestComponent />);
    await screen.findAllByTestId("user");
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    server.use(
        rest.get("https://randomuser.me/api", (req, res, ctx) => {
            return res(ctx.json({ error: "Uh oh an error occurred" }));
        })
    );
    fireEvent.click(screen.getByText(/next page/i));
    expect(
        await screen.findByText(/server error occurr?ed/i)
    ).toBeInTheDocument();
    server.resetHandlers();
    fireEvent.click(screen.getByText(/retry request/i));
    await screen.findByText(/avery harris/i);
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    const users = await screen.findAllByTestId("user");
    users.forEach((user, i) => {
        let name =
            resultsAfterChangingPage.results[i].name.first +
            " " +
            resultsAfterChangingPage.results[i].name.last;
        expect(user).toHaveTextContent(name);
    });
    fireEvent.click(screen.getByTestId("reset"));
    console.log("DONE");
});
