import { render } from "@testing-library/react";
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
    const { getByText } = render(<TodoList {...initialProps} {...props} />);

    const todo1 = getByText(sampleTodos[0].title);
    const todo2 = getByText(sampleTodos[1].title);

    return {
      todo1,
      todo2,
    };
  };

  it("test Todo list", () => {
    const { todo1, todo2 } = setup();

    expect(todo1).toBeTruthy();
    expect(todo2).toBeTruthy();
  });
});
