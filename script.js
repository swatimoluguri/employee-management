(async function () {
  const result = await fetch("empList.json");
  let empList = await result.json();
  const employeeList = document.querySelector(".emp-name");
  const selectEmployee = document.querySelector(".emp-details");
  let selectedEmpl = empList[0].id;
  const addEmployeeBtn = document.querySelector(".add-emp");
  const addEmployeeDiv = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployeeForm");
  addEmployeeBtn.addEventListener("click", () => {
    addEmployeeDiv.style.display =
      addEmployeeDiv.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", (event) => {
    if (
      !addEmployeeDiv.contains(event.target) &&
      event.target !== addEmployeeBtn
    ) {
      addEmployeeDiv.style.display = "none";
    }
  });
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((emp) => {
      empData[emp[0]] = emp[1];
    });
    empData.id=empList[empList.length-1].id+1;
    var today = new Date();
    var birthDate = new Date(empData['dob']);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    empData.age=age;
    empList.push(empData);
    addEmployeeDiv.style.display = "none";
    renderEmployees();
  });
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
    console.log(selectedEmpl);
    if (selectedEmpl && selectedEmpl.id) {
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
    } else {
      selectEmployee.innerHTML = "";
      return;
    }
  };
  renderEmployees();
  selectedEmpl && renderSingleEmployee();
})();
