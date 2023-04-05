import { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const newId =
        todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1;
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo.trim(),
        completed: false,
      };
      setTodoItems([...todoItems, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleTodoItemDelete = (itemId: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== itemId));
  };

  const handleTodoItemToggle = (itemId: number) => {
    setTodoItems(
      todoItems.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Todo List</h1>
          <form
            onSubmit={handleNewTodoSubmit}
            className="flex flex-row items-center mb-6"
          >
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={handleNewTodoChange}
              className="flex-1 p-4 rounded-l-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-4 rounded-r-lg"
            >
              Add
            </button>
          </form>
          <ul>
            {todoItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-row justify-between items-center bg-gray-200 p-6 mb-4 rounded-lg shadow-md"
              >
                <span
                  onClick={() => handleTodoItemToggle(item.id)}
                  className={`flex-1 text-lg ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => handleTodoItemDelete(item.id)}
                  className="bg-red-500 text-white px-6 py-4 rounded-lg ml-4"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
