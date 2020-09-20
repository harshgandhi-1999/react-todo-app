import React, { useState, useEffect } from "react";
import "./MainContent.css";
import AddTodoComponent from "./AddTodoComponent";
import TodoListContainer from "./TodoListContainer";

import { axiosInstance } from "../../../utils/axiosIntercepter";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const MainContent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("UserId");
  const handleAddTodo = ({ name, description }) => {
    axiosInstance
      .post(`/create-todo/${userId}`, {
        name: name,
        description: description,
      })
      .then((res) => {
        message.success(res.data.message);
        fetchTodoList();
      })
      .catch((err) => {
        if (err.response) {
          message.error(
            err.response.data.message +
              ",You already have a todo with that name"
          );
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  const handleDeleteTodo = (name, todoItemId, completed) => {
    if (completed === false) {
      confirm({
        title:
          "Are you sure you want to delete this todo, it is not completed yet?",
        icon: <ExclamationCircleOutlined />,
        content: name,
        okText: "DELETE",
        okType: "danger",
        cancelText: "CLOSE",
        onOk() {
          console.log("OK");
          axiosInstance
            .delete(`/delete-todo/${userId}/${todoItemId}`)
            .then((res) => {
              message.success(res.data.message);
              console.log(res);
              fetchTodoList();
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response);
              } else {
                message.error(err.message);
                console.log(err.message);
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      axiosInstance
        .delete(`/delete-todo/${userId}/${todoItemId}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          } else {
            console.log(err.message);
          }
        });
    }
  };

  const fetchTodoList = () => {
    setLoading(true);
    axiosInstance
      .get(`/get-all-todos/${userId}`)
      .then((res) => {
        const todolist = res.data.items.map((item) => {
          return {
            id: item._id,
            name: item.name,
            description: item.description,
            completed: item.completed,
          };
        });

        setTodos(todolist);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
          message.error(err.message);
        }
      });
  };

  useEffect(fetchTodoList, []);

  return (
    <div className="main-content-style">
      <AddTodoComponent handleAddTodo={handleAddTodo} />
      <TodoListContainer
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        loading={loading}
      />
    </div>
  );
};

export default MainContent;
