import { fireEvent, render } from "@testing-library/react";
import CreateTodo from "./CreateTodo";

describe("<CreateTodo />", () => {
  const setup = (props = {}) => {
    const { getByText, getByPlaceholderText } = render(
      <CreateTodo {...props} />
    );

    const input = getByPlaceholderText("할 일 입력!!!");
    const submit = getByText("투두생성");

    return {
      input,
      submit,
    };
  };

  it("check input & button", () => {
    const { input, submit } = setup();

    expect(input).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  it("check input", () => {
    const { input } = setup();

    fireEvent.change(input, {
      target: {
        value: "🛍️ Shopping",
      },
    });

    expect(input).toHaveAttribute("value", "🛍️ Shopping");
  });

  it("make Todo", () => {
    const onInsert = jest.fn();
    const { input, submit } = setup({ onInsert });

    fireEvent.change(input, {
      target: {
        value: "🛍️ Shopping",
      },
    });

    fireEvent.click(submit);

    expect(input).toHaveAttribute("value", "");
  });
});
