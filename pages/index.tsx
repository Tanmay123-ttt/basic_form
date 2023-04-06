import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";

interface TodoItem {
  id: number;
  text: string;
}

const Todo = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      };
      setTodoItems([...todoItems, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleTodoItemDelete = (itemId: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center bg-pink-500 py-4 px-6">
          <h1 className="text-white font-bold text-xl">Todo</h1>
          <button
            className="text-white focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-md p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <HiMenu size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="bg-white py-2 px-6">
            {/* add content here if needed */}
          </div>
        )}

        <div className="p-6">
          <form
            onSubmit={handleNewTodoSubmit}
            className="flex flex-row items-center mb-6"
          >
            <input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={handleNewTodoChange}
              className="flex-1 p-4 rounded-l-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
            />
          </form>
          <ul>
            {todoItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-row justify-between items-center bg-gray-200 p-6 mb-4 rounded-lg shadow-md"
              >
                <span className="flex-1 text-lg text-gray-800">
                  {item.text}
                </span>
                <button
                  onClick={() => handleTodoItemDelete(item.id)}
                  className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-full p-2"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white py-4 px-6 flex justify-center">
          <button
            onClick={handleNewTodoSubmit}
            className="text-white bg-pink-500 rounded-full p-4 focus:outline-none focus:ring-2 focus:ring-pink-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
