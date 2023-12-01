import { fireEvent, render } from "@testing-library/react";
import TodoList from "./TodoList";

describe("<TodoList />", () => {
  const sampleTodos = [
    {
      id: 1,
      title: "🚀 Rocket",
      isDone: false,
    },
    {
      id: 2,
      title: "🛸 UFO",
      isDone: false,
    },
  ];
  const setup = (props = {}) => {
    const initialProps = { todos: sampleTodos };
    const { getByText, getAllByText } = render(
      <TodoList {...initialProps} {...props} />
    );

    const todo1 = getByText(sampleTodos[0].title);
    const todo2 = getByText(sampleTodos[1].title);

    return {
      getByText,
      getAllByText,
    };
  };

  it("test Todo list", () => {
    const { getByText } = setup();

    expect(getByText(sampleTodos[0].title)).toBeTruthy();
    expect(getByText(sampleTodos[1].title)).toBeTruthy();
  });

  it("call onToggle", () => {
    const onToggle = jest.fn();
    const { getByText } = setup({ onToggle });

    fireEvent.click(getByText(sampleTodos[0].title));

    expect(onToggle).toHaveBeenCalledWith(sampleTodos[0].id);
  });

  it("call onDelete", () => {
    const onDelete = jest.fn();
    const { getAllByText } = setup({ onDelete });

    fireEvent.click(getAllByText("삭제")[0]);
    expect(onDelete).toHaveBeenCalledWith(sampleTodos[0].id);
  });
});
