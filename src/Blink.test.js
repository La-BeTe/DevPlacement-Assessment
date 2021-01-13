import { render, screen } from "@testing-library/react";
import Blink from "./Blink";

test("should show text prop immediately on initial render", () => {
    jest.useFakeTimers();
    render(<Blink text="Hello" />);
    // expect(setTimeout).toHaveBeenCalledTimes(2);
    const blinkElement = screen.getByText("Hello");
    expect(blinkElement).toBeInTheDocument();
    expect(blinkElement).toHaveClass("Blink");
});

test("should render new text passed from parent", async () => {
    const { rerender } = render(<Blink text="Hello" />);
    expect(await screen.findByText("Hello")).toBeInTheDocument();
    rerender(<Blink text="World" />);
    expect(await screen.findByText("World")).toBeInTheDocument();
});

test("should throw error if text prop is not a string", () => {
    expect(() => render(<Blink text={1} />)).toThrowError(
        "Blink component expects a string for the text prop"
    );
});
