(async function () {
  const result = await fetch("empList.json");
  let empList = await result.json();
  const employeeList = document.querySelector(".emp-name");
  const selectEmployee = document.querySelector(".emp-details");
  let selectedEmpl = empList[0].id;

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmpl.id !== e.target.id) {
      selectedEmpl = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }
    if (e.target.tagName === "I") {
      empList = empList.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmpl.id) === e.target.parentNode.id) {
        selectedEmpl = empList[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    empList.forEach((element) => {
      const employee = document.createElement("span");
      employee.classList.add("emp-tile");
      if (parseInt(selectedEmpl, 10) === element.id) {
        employee.classList.add("selected");
        selectedEmpl = element;
      }
      employee.setAttribute("id", element.id);
      employee.innerHTML = `${element.firstName} ${element.lastName} <i class="employeeDelete">❌</i> `;
      employeeList.append(employee);
    });
  };
  const renderSingleEmployee = () => {
    if (selectedEmpl&& selectedEmpl.id) {
      selectEmployee.innerHTML = `
        <img src="${selectedEmpl.imageUrl}"/>
        <span class="emp-name-single">${
          selectedEmpl.firstName + " " + selectedEmpl.lastName
        }</span>
        <span>${selectedEmpl.email}</span>
        <span>${selectedEmpl.contactNumber}</span>
        <span>${selectedEmpl.age}</span>
        <span>${selectedEmpl.dob}</span>
        <span>${selectedEmpl.salary}</span>
        <span>${selectedEmpl.address}</span>`;
    }else{
        selectEmployee.innerHTML ='';
        return;
    }
  };
  renderEmployees();
  selectedEmpl && renderSingleEmployee();
})();
