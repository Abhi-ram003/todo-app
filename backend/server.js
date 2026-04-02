require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// ✅ Schema
const TodoSchema = new mongoose.Schema({
  text: String
});

const Todo = mongoose.model("Todo", TodoSchema);

// GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ADD todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  await newTodo.save();
  res.json(newTodo);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// UPDATE todo
app.put("/todos/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, {
    text: req.body.text
  });

  res.send("Updated");
});

// ROOT route
app.get("/", (req, res) => {
  res.send("Todo API with MongoDB 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));