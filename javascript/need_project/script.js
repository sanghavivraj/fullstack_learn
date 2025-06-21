document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  const Todos = [];

  function renderList() {
    todoList.innerHTML = "";

    Todos.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.text;

      if (task.completed) {
        li.style.textDecoration = "line-through";
      }

      // ✅ Done Button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Done";
      completeBtn.addEventListener("click", () => {
        Todos[index].completed = !Todos[index].completed;
        renderList();
      });

      // ✅ Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        Todos.splice(index, 1);
        renderList();
      });

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  // ✅ Add Button
  addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text !== "") {
      Todos.push({ text: text, completed: false });
      todoInput.value = "";
      renderList();
    }
  });
});
