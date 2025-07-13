let employees = [];
let currentPage = 1;

// Load employees from localStorage or JSON file
const storedData = localStorage.getItem("employees");
if (storedData) {
  employees = JSON.parse(storedData);
  renderEmployees();
} else {
  fetch("data/employees.json")
    .then((res) => res.json())
    .then((data) => {
      employees = data;
      localStorage.setItem("employees", JSON.stringify(employees));
      renderEmployees();
    });
}

// Pagination and render
function renderEmployees() {
  const container = document.getElementById("employeeList");
  const search = document.getElementById("search").value.toLowerCase();
  const pageSize = parseInt(document.getElementById("pageSize").value) || 10;

  const filtered = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  if (currentPage > totalPages) currentPage = totalPages || 1;

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

  // Update pagination display
  document.getElementById(
    "pageInfo"
  ).textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled =
    currentPage === totalPages || totalPages === 0;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees();
  }
}

function nextPage() {
  const pageSize = parseInt(document.getElementById("pageSize").value) || 10;
  const search = document.getElementById("search").value.toLowerCase();
  const filtered = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(search) ||
      emp.lastName.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderEmployees();
  }
}

// Actions
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
    localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees();
  }
}

// Listeners
document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  renderEmployees();
});

window.onload = function () {
  renderEmployees();
};
