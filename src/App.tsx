import React, { FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { Divider } from "@aws-amplify/ui-react";
import { createTodo } from "./graphql/mutations";
import { onCreateTodo } from "./graphql/subscriptions";

interface TodoType {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}

interface InputType {
  name: string;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState<InputType>({
    name: "",
    description: "",
  });
  const fetchTodo = async () => {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      const itmes = todoData.data.listTodos.items;
      setTodos(itmes);
    } catch (e) {
      console.log("error listTodo ...");
    }
  };

  const addTodo = async (value: InputType) => {
    try {
      const result = await API.graphql(
        graphqlOperation(createTodo, { input: value })
      );
    } catch (e) {
      console.log("error with adding new todo");
    }
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    addTodo(input);
  };

  useEffect(() => {
    fetchTodo();
    // @ts-ignore
    API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: ({ provider, value }: any) => {
        const createdTodo: TodoType = value.data.onCreateTodo;
        setTodos((prev) => [createdTodo, ...prev]);
        console.log("createdTodo", createdTodo);
      },
      error: (error: any) => console.warn(error),
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello my Kong!</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={input.name}
          name={"name"}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          type="text"
          value={input.description}
          name={"description"}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />
        <button>Create</button>
      </form>
      <ul className={"todo-wrap"}>
        {todos.map((todo) => (
          <li key={todo.id} className={"todo-item"}>
            <h4>{todo.name}</h4>
            <Divider />
            <div>{todo.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
