import { fireEvent, getByText, render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("test CreateTodo rendering", () => {
    const { getByText } = render(<App />);

    getByText("투두생성");
  });

  it("test TodoList rendering", () => {
    const { getByTestId } = render(<App />);

    getByTestId("TodoList");
  });

  it("test TodoList", () => {
    const { getByText } = render(<App />);

    getByText("🚀 Rocket");
    getByText("🛸 UFO");
  });

  it("test making TodoList", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText("할 일 입력!!!");
    const submit = getByText("투두생성");

    fireEvent.change(input, {
      target: {
        value: "👽 alien",
      },
    });
    fireEvent.submit(submit);

    getByText("👽 alien");
  });

  it("test todo is done", () => {
    const { getByText } = render(<App />);
    const span = getByText("🚀 Rocket");

    fireEvent.click(span);
    expect(span).toHaveClass("line-through");
    fireEvent.click(span);
    expect(span).not.toHaveClass("line-through");
  });

  it("test delete todo", () => {
    const { getByText, queryByText } = render(<App />);
    const span = getByText("🚀 Rocket");
    const button = span.nextSibling;

    fireEvent.click(button);

    const removedSpan = queryByText("🚀 Rocket");
    expect(removedSpan).toBeNull();
    const existSpan = queryByText("🛸 UFO");
    expect(existSpan).not.toBeNull();
  });
});
