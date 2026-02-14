const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

const getDb = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));

const getTasks = (req, res) => {
  const db = getDb();
  res.json(db.tasks || []);
};

const createTask = (req, res) => {
  const db = getDb();
  
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    completed: false,
    createdAt: new Date(), 
    priority: req.body.priority || 'low'
  };

  db.tasks.push(newTask);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const index = db.tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  db.tasks[index] = { ...db.tasks[index], ...req.body };
  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(db.tasks[index]);
};

const toggleTaskStatus = (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  const task = db.tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json(task);
};

const deleteTask = (req, res) => {
  const db = getDb();
  const id = Number(req.params.id);
  
  db.tasks = db.tasks.filter(t => t.id !== id);
  
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(204).send();
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
};