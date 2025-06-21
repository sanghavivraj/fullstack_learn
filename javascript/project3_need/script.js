document.addEventListener('DOMContentLoaded', () => {
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const addBtn = document.getElementById("add-expense");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  const expenses = [];
  let editIndex =-1;

  function renderDisplay() {
    expenseList.innerHTML = "";
    let total = 0;
    

    expenses.forEach((expense, index) => {
      const li = document.createElement('li');
      li.textContent = `${expense.name} - ₹${expense.amount}`;

      //delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener('click', () => {
        expenses.splice(index, 1);
        renderDisplay();
      });

      //update button
      const updateBtn = document.createElement("button");
      updateBtn.textContent = "update";
      updateBtn.addEventListener('click',()=> {
        expenseName.value=expense.name;
        expenseAmount.value=expense.amount;
        editIndex= index;
        addBtn.textContent="update Expenses";
        // renderDisplay();
      })

      li.appendChild(deleteBtn);
      li.appendChild(updateBtn);
      expenseList.appendChild(li);

      total += expense.amount;
    });

    totalAmount.textContent = total;
  }

  addBtn.addEventListener('click', () => {
    const name = expenseName.value.trim(); 
    const amount = parseFloat(expenseAmount.value); 

    if (name && !isNaN(amount) && amount > 0) {
        if(editIndex === -1) {
      expenses.push({ name, amount });
        } else {
            expenses[editIndex] = {name,amount};
            editIndex =-1;
            addBtn.textContent="add Expense";

        }
        expenseName.value = "";
        expenseAmount.value = "";

      renderDisplay();
    } else {
      alert("Please enter valid name and amount.");
    }
  });
});



