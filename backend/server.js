const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = []; // fake database

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.send("Deleted");
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: req.body.text } : todo
  );

  res.send("Updated");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));