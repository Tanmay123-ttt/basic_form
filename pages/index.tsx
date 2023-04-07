import React, { Component } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todoItems: TodoItem[];
  newTodo: string;
  menuOpen: boolean;
}

class Todo extends Component<{}, TodoState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      todoItems: [],
      newTodo: "",
      menuOpen: false,
    };

    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    this.handleNewTodoSubmit = this.handleNewTodoSubmit.bind(this);
    this.handleTodoItemDelete = this.handleTodoItemDelete.bind(this);
    this.handleTodoItemCompleteToggle =
      this.handleTodoItemCompleteToggle.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleNewTodoChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.addNewTodoItem();
  }

  handleAddButtonClick() {
    this.addNewTodoItem();
  }

  addNewTodoItem() {
    if (this.state.newTodo.trim() !== "") {
      const newId =
        this.state.todoItems.length > 0
          ? this.state.todoItems[this.state.todoItems.length - 1].id + 1
          : 1;
      const newTodoItem: TodoItem = {
        id: newId,
        text: this.state.newTodo.trim(),
        completed: false,
      };
      this.setState((prevState) => ({
        todoItems: [...prevState.todoItems, newTodoItem],
        newTodo: "",
      }));
    }
  }

  handleTodoItemDelete(itemId: number) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.filter((item) => item.id !== itemId),
    }));
  }

  handleTodoItemCompleteToggle(itemId: number) {
    this.setState((prevState) => ({
      todoItems: prevState.todoItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    }));
  }

  render() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center bg-pink-500 py-4 px-6">
            <h1 className="text-white font-bold text-xl">Todo</h1>
            <button
              className="text-white focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-md p-2"
              onClick={() =>
                this.setState((prevState) => ({
                  menuOpen: !prevState.menuOpen,
                }))
              }
            >
              <HiMenu size={24} />
            </button>
          </div>
          <div className="p-6">
            <form
              onSubmit={this.handleNewTodoSubmit}
              className="flex flex-row items-center mb-6"
            >
              <input
                type="text"
                placeholder="Add a new todo"
                value={this.state.newTodo}
                onChange={this.handleNewTodoChange}
                className="flex-grow mr-4 py-2 px-4 rounded-md
                bg-gray-200 text-gray-700 focus:outline-none focus:bg-white"
              />
            </form>
            <div className="space-y-2">
              {this.state.todoItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-200 rounded-md py-2 px-4"
                >
                  <div
                    className="flex items-center"
                    style={
                      item.completed
                        ? { textDecoration: "line-through", color: "gray" }
                        : {}
                    }
                  >
                    <button
                      className="text-gray-500 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-md p-1"
                      onClick={() => this.handleTodoItemCompleteToggle(item.id)}
                    >
                      {item.completed ? (
                        <MdCheckBox size={24} />
                      ) : (
                        <MdCheckBoxOutlineBlank size={24} />
                      )}
                    </button>
                    <span className="ml-2">{item.text}</span>
                  </div>
                  <button
                    className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-md p-1"
                    onClick={() => this.handleTodoItemDelete(item.id)}
                  >
                    <AiOutlineDelete size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center  py-4">
            <button
              className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
              onClick={this.handleAddButtonClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
