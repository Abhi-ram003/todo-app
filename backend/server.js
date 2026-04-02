const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB with connection pooling
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

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
  res.json({ message: "Deleted" });
});

// UPDATE todo
app.put("/todos/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, {
    text: req.body.text
  });

  res.json({ message: "Updated" });
});

// ROOT route
app.get("/", (req, res) => {
  res.send("Todo API with MongoDB 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
