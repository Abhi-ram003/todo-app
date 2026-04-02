console.log("JS Loaded");

// Change this to your deployed backend URL
const API = "https://todo-app-03jg.onrender.com/todos"; // ✅ LOCAL BACKEND

const input = document.getElementById("input");
const list = document.getElementById("list");

// Load todos
async function loadTodos() {
  const res = await fetch(API);
  const todos = await res.json();

  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => editTodo(todo._id, todo.text));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => deleteTodo(todo._id));

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

// Add todo
async function addTodo() {
  const text = input.value.trim();
  if (text === "") {
    alert("Type something bro 😄");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadTodos();
}

// Edit todo
async function editTodo(id, oldText) {
  const newText = prompt("Edit todo:", oldText);

  if (newText === null) return; // cancel pressed
  if (newText.trim() === "") {
    alert("Type something bro 😄");
    return;
  }

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: newText.trim() })
  });

  loadTodos();
}

// Load todos when page opens
loadTodos();