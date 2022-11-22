const submitButton = document.querySelector("#submit");
const employeeListDiv = document.querySelector("#employee-list");

submitButton.addEventListener("click", () => {
  fetch("http://localhost:3000/api", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((list) => {
      employeeListDiv.innerHTML = ``;

      for (const employee of list) {
        employeeListDiv.innerHTML += `<div>
            <span>${employee.employeeId}</span>
            <span>${employee.employeeName}</span>
            </div>`;
      }
    });
});
