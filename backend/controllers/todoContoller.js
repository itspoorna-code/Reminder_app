const TodoList = require("../models/todo.js");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoList.find({ user: req.user });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { text, description, date } = req.body;

    const newTodo = new TodoList({
      text,
      description,
      date: date ? new Date(date) : undefined,
      user: req.user,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create todo" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoList.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo)
      return res.status(404).json({ error: "Todo not found or unauthorized" });

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete todo" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { text, description, completed, date } = req.body;

    const updated = await TodoList.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { text, description, completed, date },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Todo not found or unauthorized" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update todo" });
  }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo };
