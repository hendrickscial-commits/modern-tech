/*=========================================================
        MODERNTECH SOLUTIONS
        PERFORMANCE MANAGEMENT SYSTEM
==========================================================*/


/*=========================================================
                    EMPLOYEE DATABASE

const employees = [

    {
        id: "EMP001",
        name: "Sibongile Nkosi",
        department: "Software Development",
        position: "Frontend Developer",
        attendance: 98,
        score: 96,
        rating: "Excellent",
        comment: "Consistently exceeds expectations and delivers high-quality work.",
        image: "images/employee1.jpg"
    },

    {
        id: "EMP002",
        name: "Lwazi Mokoena",
        department: "Human Resources",
        position: "HR Officer",
        attendance: 94,
        score: 88,
        rating: "Good",
        comment: "Strong communication skills and dependable team member.",
        image: "images/employee2.jpg"
    },

    {
        id: "EMP003",
        name: "Ayanda Dlamini",
        department: "Finance",
        position: "Financial Analyst",
        attendance: 96,
        score: 91,
        rating: "Excellent",
        comment: "Excellent attention to detail with outstanding reporting skills.",
        image: "images/employee3.jpg"
    },

    {
        id: "EMP004",
        name: "Lerato Mokoena",
        department: "Marketing",
        position: "Marketing Officer",
        attendance: 89,
        score: 80,
        rating: "Good",
        comment: "Creative thinker who consistently contributes fresh ideas.",
        image: "images/employee4.jpg"
    },

    {
        id: "EMP005",
        name: "Themba Khumalo",
        department: "IT Support",
        position: "Systems Technician",
        attendance: 85,
        score: 74,
        rating: "Average",
        comment: "Reliable technician with opportunities to improve response times.",
        image: "images/employee5.jpg"
    },

    {
        id: "EMP006",
        name: "Nokwanda Mthembu",
        department: "Sales",
        position: "Sales Consultant",
        attendance: 97,
        score: 95,
        rating: "Excellent",
        comment: "Top-performing sales consultant with exceptional client satisfaction.",
        image: "images/employee6.jpg"
    },

    {
        id: "EMP007",
        name: "Andile Jacobs",
        department: "Operations",
        position: "Operations Coordinator",
        attendance: 91,
        score: 82,
        rating: "Good",
        comment: "Keeps projects organised and meets deadlines consistently.",
        image: "images/employee7.jpg"
    },

    {
        id: "EMP008",
        name: "Zanele Smith",
        department: "Customer Service",
        position: "Support Specialist",
        attendance: 84,
        score: 72,
        rating: "Average",
        comment: "Maintains positive customer relationships with room for growth.",
        image: "images/employee8.jpg"
    },

    {
        id: "EMP009",
        name: "Nandi Maseko",
        department: "Administration",
        position: "Office Administrator",
        attendance: 80,
        score: 67,
        rating: "Needs Improvement",
        comment: "Performance has declined recently and requires additional support.",
        image: "images/employee9.jpg"
    },

    {
        id: "EMP010",
        name: "Sipho Daniels",
        department: "Cyber Security",
        position: "Security Analyst",
        attendance: 99,
        score: 98,
        rating: "Excellent",
        comment: "Outstanding performer with excellent analytical and problem-solving skills.",
        image: "images/employee10.jpg"
    }

];


/*=========================================================
                    DOM ELEMENTS
==========================================================*/

const employeeContainer = document.getElementById("employeeContainer");

const searchInput = document.getElementById("searchInput");

const detailImage = document.getElementById("detailImage");
const detailName = document.getElementById("detailName");
const detailPosition = document.getElementById("detailPosition");
const detailID = document.getElementById("detailID");
const detailDepartment = document.getElementById("detailDepartment");
const detailAttendance = document.getElementById("detailAttendance");
const detailScore = document.getElementById("detailScore");
const detailBadge = document.getElementById("detailBadge");
const detailComment = document.getElementById("detailComment");

const totalEmployees = document.getElementById("totalEmployees");
const excellentCount = document.getElementById("excellentCount");
const goodCount = document.getElementById("goodCount");
const averageCount = document.getElementById("averageCount");
const improvementCount = document.getElementById("improvementCount");

const currentDate = document.getElementById("currentDate");

const scrollTopBtn = document.getElementById("scrollTopBtn");

const emptyState = document.getElementById("emptyState");

     // CURRENT DATE

const today = new Date();

currentDate.textContent =
today.toLocaleDateString("en-ZA",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});

    // UPDATE DASHBOARD STATISTICS
function updateStatistics(){

    totalEmployees.textContent = employees.length;

    excellentCount.textContent =
        employees.filter(employee => employee.rating === "Excellent").length;

    goodCount.textContent =
        employees.filter(employee => employee.rating === "Good").length;

    averageCount.textContent =
        employees.filter(employee => employee.rating === "Average").length;

    improvementCount.textContent =
        employees.filter(employee => employee.rating === "Needs Improvement").length;

}

    // CREATE EMPLOYEE CARDS

function createEmployeeCard(employee){

    return `

        <div class="employee-card fade-in">

            <div class="employee-header">

                <img
                    src="${employee.image}"
                    alt="${employee.name}">

                <div class="employee-info">

                    <h3>${employee.name}</h3>

                    <p>${employee.position}</p>

                    <span class="employee-id">

                        ${employee.id}

                    </span>

                </div>

            </div>

            <div class="employee-stats">

                <div class="employee-stat">

                    <span>Department</span>

                    <strong>${employee.department}</strong>

                </div>

                <div class="employee-stat">

                    <span>Attendance</span>

                    <strong>${employee.attendance}%</strong>

                </div>

                <div class="employee-stat">

                    <span>Performance</span>

                    <strong>${employee.score}%</strong>

                </div>

                <div class="employee-stat">

                    <span>Rating</span>

                    <strong>${employee.rating}</strong>

                </div>

            </div>

            <span class="performance-badge ${getBadgeClass(employee.rating)}">

                ${employee.rating}

            </span>

            <div class="card-buttons">

                <button
                    class="view-btn"
                    onclick="showEmployee('${employee.id}')">

                    <i class="fa-solid fa-eye"></i>

                    View

                </button>

            </div>

        </div>

    `;

}


/*=========================================================
                PERFORMANCE BADGE
==========================================================*/

function getBadgeClass(rating){

    switch(rating){

        case "Excellent":

            return "excellent";

        case "Good":

            return "good";

        case "Average":

            return "average";

        default:

            return "improvement";

    }

}


/*=========================================================
                DISPLAY EMPLOYEES
==========================================================*/

function displayEmployees(list){

    employeeContainer.innerHTML = "";

    if(list.length === 0){

        employeeContainer.style.display = "none";

        emptyState.style.display = "block";

        return;

    }

    employeeContainer.style.display = "grid";

    emptyState.style.display = "none";

    list.forEach(employee=>{

        employeeContainer.innerHTML +=
            createEmployeeCard(employee);

    });

}

 // INITIALISE DASHBOARD

displayEmployees(employees);

updateStatistics();

showEmployee(employees[0].id);

/*=========================================================
                SEARCH EMPLOYEES
==========================================================*/

searchInput.addEventListener("keyup", function(){

    const searchValue =
        this.value.toLowerCase().trim();

    const filteredEmployees =
        employees.filter(employee =>

            employee.name.toLowerCase().includes(searchValue) ||

            employee.department.toLowerCase().includes(searchValue) ||

            employee.position.toLowerCase().includes(searchValue) ||

            employee.id.toLowerCase().includes(searchValue)

        );

    displayEmployees(filteredEmployees);

});


/*=========================================================
                EDIT / SAVE / CANCEL
==========================================================*/

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let selectedEmployee = employees[0];
let originalComment = selectedEmployee.comment;


/*=========================================================
                UPDATE SELECTED EMPLOYEE
==========================================================*/

function showEmployee(employeeID){

    const employee =
        employees.find(emp => emp.id === employeeID);

    if(!employee) return;

    selectedEmployee = employee;

    originalComment = employee.comment;

    detailImage.src = employee.image;

    detailName.textContent = employee.name;

    detailPosition.textContent = employee.position;

    detailID.textContent = employee.id;

    detailDepartment.textContent = employee.department;

    detailAttendance.textContent = employee.attendance + "%";

    detailScore.textContent = employee.score + "%";

    detailComment.value = employee.comment;

    detailBadge.textContent = employee.rating;

    detailBadge.className =
        "performance-badge " +
        getBadgeClass(employee.rating);

    detailComment.readOnly = true;

}


/*=========================================================
                EDIT COMMENT
==========================================================*/

editBtn.addEventListener("click", ()=>{

    detailComment.readOnly = false;

    detailComment.focus();

    showToast("Edit mode enabled.");

});


/*=========================================================
                SAVE COMMENT
==========================================================*/

saveBtn.addEventListener("click", ()=>{

    selectedEmployee.comment =
        detailComment.value;

    originalComment =
        detailComment.value;

    detailComment.readOnly = true;

    showToast("Changes saved successfully.");

});


/*=========================================================
                CANCEL EDIT
==========================================================*/

cancelBtn.addEventListener("click", ()=>{

    detailComment.value =
        originalComment;

    detailComment.readOnly = true;

    showToast("Changes cancelled.");

});


/*=========================================================
                SIDEBAR TOGGLE
==========================================================*/

const sidebar =
    document.getElementById("sidebar");

const menuToggle =
    document.getElementById("menuToggle");

menuToggle.addEventListener("click", ()=>{

    sidebar.classList.toggle("active");

});


/*=========================================================
                SCROLL TO TOP
==========================================================*/

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 300){

        scrollTopBtn.style.display = "flex";

    }

    else{

        scrollTopBtn.style.display = "none";

    }

});


scrollTopBtn.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*=========================================================
                TOAST NOTIFICATIONS
==========================================================*/

function showToast(message){

    const toastContainer =
        document.getElementById("toastContainer");

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

        <strong>Success</strong>

        <br>

        ${message}

    `;

    toastContainer.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*=========================================================
                REFRESH EMPLOYEES
==========================================================*/

const refreshBtn = document.getElementById("refreshEmployees");

refreshBtn.addEventListener("click", () => {

    loadingOverlay.style.display = "flex";

    setTimeout(() => {

        displayEmployees(employees);

        updateStatistics();

        showEmployee(selectedEmployee.id);

        loadingOverlay.style.display = "none";

        showToast("Employee list refreshed.");

    }, 1200);

});


/*=========================================================
                SORT EMPLOYEES
==========================================================*/

const sortBtn = document.getElementById("sortEmployees");

let ascending = true;

sortBtn.addEventListener("click", () => {

    employees.sort((a, b) => {

        return ascending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);

    });

    ascending = !ascending;

    displayEmployees(employees);

    showToast("Employee list sorted.");

});


/*=========================================================
                LOADING OVERLAY
==========================================================*/

const loadingOverlay =
document.getElementById("loadingOverlay");


/*=========================================================
                CONFIRMATION MODAL
==========================================================*/

const confirmationModal =
document.getElementById("confirmationModal");

const confirmYes =
document.getElementById("confirmYes");

const confirmNo =
document.getElementById("confirmNo");


function showConfirmation(message, callback){

    document.getElementById("modalMessage").textContent = message;

    confirmationModal.style.display = "flex";

    confirmYes.onclick = () => {

        confirmationModal.style.display = "none";

        callback();

    };

    confirmNo.onclick = () => {

        confirmationModal.style.display = "none";

    };

}


/*=========================================================
                CLOSE DETAILS PANEL
==========================================================*/

const closePanel =
document.getElementById("closePanel");

const detailsPanel =
document.getElementById("detailsPanel");

closePanel.addEventListener("click", () => {

    detailsPanel.style.display = "none";

});


/*=========================================================
                REOPEN DETAILS PANEL
==========================================================*/

document.addEventListener("click", (event) => {

    if(event.target.closest(".view-btn")){

        detailsPanel.style.display = "block";

    }

});


/*=========================================================
                ESC KEY CLOSES MODAL
==========================================================*/

document.addEventListener("keydown", (event) => {

    if(event.key === "Escape"){

        confirmationModal.style.display = "none";

    }

});


/*=========================================================
                CLICK OUTSIDE MODAL
==========================================================*/

window.addEventListener("click", (event) => {

    if(event.target === confirmationModal){

        confirmationModal.style.display = "none";

    }

});


/*=========================================================
                FINAL INITIALISATION
==========================================================*/

window.addEventListener("load", () => {

    loadingOverlay.style.display = "flex";

    setTimeout(() => {

        loadingOverlay.style.display = "none";

    }, 1000);

});


/*=========================================================
                SAFETY CHECKS
==========================================================*/

if(employeeContainer){

    displayEmployees(employees);

}

if(totalEmployees){

    updateStatistics();

}

if(employees.length > 0){

    showEmployee(employees[0].id);

}

console.log("ModernTech Performance Dashboard Loaded Successfully.");