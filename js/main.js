let employees = [];
let currentPage = 1;

// Load employees from localStorage
const storedData = localStorage.getItem("employees");
const search = document.getElementById("search").value.toLowerCase();
const filtered = employees.filter(
  (emp) =>
    emp.firstName.toLowerCase().includes(search) ||
    emp.lastName.toLowerCase().includes(search) ||
    emp.email.toLowerCase().includes(search)
);
if (storedData) {
  employees = JSON.parse(storedData);
  renderEmployees();
} else {
  fetch("data/employees.json")
    .then((res) => res.json())
    .then((data) => {
      employees = data;
      // save it locally
      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployees();
    });
}

function renderEmployees() {
  const container = document.getElementById("employeeList");
  const search = document.getElementById("search").value.toLowerCase();
  const pageSize = parseInt(document.getElementById("pageSize").value);
  const filtered = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
  );

  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  container.innerHTML = paged
    .map(
      (emp) => `
    <div class="card">
      <p><b>${emp.firstName} ${emp.lastName}</b></p>
      <p><b>Email</b>: ${emp.email}</p>
      <p><b>Department</b>: ${emp.department}</p>
      <p><b>Role</b>: ${emp.role}</p>
      <div>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
}

function openForm() {
  window.location.href = "form.html";
}

function editEmployee(id) {
  localStorage.setItem("editId", id);
  openForm();
}

function deleteEmployee(id) {
  if (confirm("Delete this employee?")) {
    employees = employees.filter((emp) => emp.id !== id);
    renderEmployees();
  }
}

document.getElementById("search").addEventListener("input", renderEmployees);
