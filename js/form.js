let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editId = localStorage.getItem("editId");

if (editId) {
  document.getElementById("formTitle").innerText = "Edit Employee";
  const emp = employees.find((e) => e.id == editId);

  // Pre-fill form with existing data
  if (emp) {
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
  }
}

function submitForm(e) {
  e.preventDefault();

  const newEmp = {
    id: parseInt(document.getElementById("employeeId").value) || Date.now(),
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };

  // Check if employee already exists (edit)
  const index = employees.findIndex((e) => e.id === newEmp.id);
  if (index > -1) {
    employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.removeItem("editId");
  window.location.href = "index.html";
}
