import { fireEvent, render } from "@testing-library/react";
import TodoCard from "./TodoCard";

describe("<TodoCard />", () => {
  const sampleTodo = {
    id: 1,
    title: "🚀 Rocket",
    isDone: false,
  };

  const setup = (props = {}) => {
    const initialProps = { todo: sampleTodo };
    const { getByText } = render(<TodoCard {...initialProps} {...props} />);

    const todo = props.todo || initialProps.todo;

    const span = getByText(todo.title);
    const button = getByText("삭제");

    return {
      span,
      button,
    };
  };

  it("test span & button", () => {
    const { span, button } = setup();

    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("when isDone is true, draw line-through", () => {
    const { span } = setup({
      todo: { id: 2, title: "🍎 Apple", isDone: true },
    });

    expect(span).toHaveClass("line-through");
  });

  it("when isDone is false, erase line-through", () => {
    const { span } = setup();

    expect(span).not.toHaveClass("line-through");
  });

  it("complete todo", () => {
    const onToggle = jest.fn();
    const { span } = setup({ onToggle });

    fireEvent.click(span);

    expect(onToggle).toHaveBeenCalledWith(sampleTodo.id);
  });

  it("delete todo", () => {
    const onDelete = jest.fn();
    const { button } = setup({ onDelete });

    fireEvent.click(button);

    expect(onDelete).toHaveBeenCalledWith(sampleTodo.id);
  });
});
