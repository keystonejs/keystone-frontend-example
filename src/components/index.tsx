/*
Welcome to our components file! We wanted to focus the learnings on
how to use graphql with keystone, so we've hidden code that'll make
the rendered app feel better over here, letting you focus in the lesson
on the walkthrough's main topics.
*/
import React from "react";
import { Task } from "../types";

const getPriorityColor = (priority: string) =>
  priority === "low"
    ? "mediumspringgreen"
    : priority === "medium"
    ? "orange"
    : "red";

const cardStyle = {
  margin: "auto",
  width: 360,
  padding: 4,
  borderRadius: 3,
  marginTop: 4,
};

export const Divider = () => (
  <div
    style={{
      width: 120,
      height: 1,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 16,
      marginBottom: 16,
      background: "black",
    }}
  />
);

export const TodoItem = ({
  label,
  priority,
  isComplete,
  onCheckboxChange = () => {},
}) => {
  return (
    <div style={cardStyle}>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={() => {
          onCheckboxChange();
        }}
      />
      <div
        style={{
          height: 8,
          width: 8,
          borderRadius: 180,
          background: getPriorityColor(priority),
          display: "inline-block",
          marginLeft: 8,
          marginRight: 8,
        }}
      />
      <span>{label}</span>
    </div>
  );
};

export const ShowTasks = ({
  heading = "Still To Do 💻",
  onCheckboxChange = () => {},
  tasks,
}: {
  tasks: Task[];
  onCheckboxChange?: (task: Task) => void;
  heading: string;
}) => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{heading}</h2>
      {tasks.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          {...todoItem}
          onCheckboxChange={() => onCheckboxChange(todoItem)}
        />
      ))}
    </div>
  );
};

export const Error = ({ error }) => (
  <div>
    <div>
      We had an error contacting the Keystone server - make sure it's up and
      running.
    </div>
    <div>Error message: {error.message}</div>
  </div>
);
