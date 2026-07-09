const employeeSelect = document.getElementById("employee");
const generateBtn = document.getElementById("generateBtn");

const payslip = document.getElementById("payslip");
const emptyState = document.getElementById("emptyState");

const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const printBtn = document.getElementById("printBtn");

const employeeCode = document.getElementById("employeeCode");
const payPeriod = document.getElementById("payPeriod");

const empName = document.getElementById("empName");
const empDept = document.getElementById("empDept");
const empPosition = document.getElementById("empPosition");
const empHours = document.getElementById("empHours");

const salary = document.getElementById("salary");
const overtime = document.getElementById("overtime");
const bonus = document.getElementById("bonus");
const gross = document.getElementById("gross");

const tax = document.getElementById("tax");
const pension = document.getElementById("pension");
const medicalAid = document.getElementById("medicalAid");
const totalDeductions = document.getElementById("totalDeductions");

const netPay = document.getElementById("netPay");

const activeEmployeesEl = document.getElementById("activeEmployees");
const totalPayrollEl = document.getElementById("totalPayroll");
const averageSalaryEl = document.getElementById("averageSalary");

const employeeInformation = [
    {
        employeeId: 1,
        name: "Sibongile Nkosi",
        position: "Software Engineer",
        department: "Development",
        salary: 70000
    },
    {
        employeeId: 2,
        name: "Lungile Moyo",
        position: "HR Manager",
        department: "HR",
        salary: 80000
    },
    {
        employeeId: 3,
        name: "Thabo Molefe",
        position: "QA Analyst",
        department: "QA",
        salary: 55000
    },
    {
        employeeId: 4,
        name: "Keshav Naidoo",
        position: "Sales Representative",
        department: "Sales",
        salary: 60000
    },
    {
        employeeId: 5,
        name: "Zanele Khumalo",
        position: "Marketing Specialist",
        department: "Marketing",
        salary: 58000
    },
    {
        employeeId: 6,
        name: "Sipho Zulu",
        position: "Graphic Designer",
        department: "Design",
        salary: 65000
    },
    {
        employeeId: 7,
        name: "Naledi Moeketsi",
        position: "DevOps Engineer",
        department: "IT",
        salary: 72000
    },
    {
        employeeId: 8,
        name: "Farai Gumbo",
        position: "Content Writer",
        department: "Marketing",
        salary: 56000
    },
    {
        employeeId: 9,
        name: "Karabo Dlamini",
        position: "Accountant",
        department: "Finance",
        salary: 62000
    },
    {
        employeeId: 10,
        name: "Fatima Patel",
        position: "Support Lead",
        department: "Support",
        salary: 58000
    }
];

const payrollData = [
    {
        employeeId: 1,
        hoursWorked: 160,
        medicalAidDeduction: 8,
        finalSalary: 69500
    },
    {
        employeeId: 2,
        hoursWorked: 150,
        medicalAidDeduction: 10,
        finalSalary: 79000
    },
    {
        employeeId: 3,
        hoursWorked: 170,
        medicalAidDeduction: 4,
        finalSalary: 54800
    },
    {
        employeeId: 4,
        hoursWorked: 165,
        medicalAidDeduction: 6,
        finalSalary: 59700
    },
    {
        employeeId: 5,
        hoursWorked: 158,
        medicalAidDeduction: 5,
        finalSalary: 57850
    },
    {
        employeeId: 6,
        hoursWorked: 168,
        medicalAidDeduction: 2,
        finalSalary: 64800
    },
    {
        employeeId: 7,
        hoursWorked: 175,
        medicalAidDeduction: 3,
        finalSalary: 71800
    },
    {
        employeeId: 8,
        hoursWorked: 160,
        medicalAidDeduction: 0,
        finalSalary: 56000
    },
    {
        employeeId: 9,
        hoursWorked: 155,
        medicalAidDeduction: 5,
        finalSalary: 61500
    },
    {
        employeeId: 10,
        hoursWorked: 162,
        medicalAidDeduction: 4,
        finalSalary: 57750
    }
];


function formatCurrency(value) {

    return "R " + Number(value).toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


function loadEmployees() {

    employeeSelect.innerHTML =
        '<option value="" disabled selected>Select Employee</option>';

    employeeInformation.forEach(employee => {

        const option = document.createElement("option");

        option.value = employee.employeeId;
        option.textContent = employee.name;

        employeeSelect.appendChild(option);

    });

}


function updateSummary() {

    const totalPayroll = payrollData.reduce((total, employee) => {

        return total + employee.finalSalary;

    }, 0);


    const averageSalary = totalPayroll / payrollData.length;


    activeEmployeesEl.textContent = payrollData.length;

    totalPayrollEl.textContent =
        formatCurrency(totalPayroll);

    averageSalaryEl.textContent =
        formatCurrency(averageSalary);

}


generateBtn.addEventListener("click", () => {

    const selectedPayroll = payrollData.find(employee =>
        employee.employeeId == employeeSelect.value
    );


    if (!selectedPayroll) {

        alert("Please select an employee.");

        return;

    }


    const selectedEmployee = employeeInformation.find(employee =>
        employee.employeeId == selectedPayroll.employeeId
    );


    const selectedPeriod =
        document.getElementById("period").value;


    if (selectedPeriod) {

        const date = new Date(selectedPeriod + "-01");


        payPeriod.textContent =
            "Pay Period: " +
            date.toLocaleString("en-US", {
                month: "long",
                year: "numeric"
            });

    }


    employeeCode.textContent =
        "E" +
        selectedPayroll.employeeId
            .toString()
            .padStart(3, "0");


    empName.textContent = selectedEmployee.name;

    empDept.textContent =
        selectedEmployee.department;

    empPosition.textContent =
        selectedEmployee.position;

    empHours.textContent =
        selectedPayroll.hoursWorked + " hrs";

            const basicSalary = selectedPayroll.finalSalary;


    const overtimeHours =
        Math.max(selectedPayroll.hoursWorked - 160, 0);


    const overtimePay =
        overtimeHours * 250;


    const bonusPay =
        basicSalary >= 70000 ? 1500 : 500;


    const grossPay =
        basicSalary +
        overtimePay +
        bonusPay;


    const taxAmount =
        grossPay * 0.18;


    const pensionAmount =
        grossPay * 0.05;


    const medicalAidAmount =
        selectedPayroll.medicalAidDeduction * 250;


    const deductions =
        taxAmount +
        pensionAmount +
        medicalAidAmount;


    const netSalary =
        grossPay -
        deductions;


    salary.textContent =
        formatCurrency(basicSalary);


    overtime.textContent =
        formatCurrency(overtimePay);


    bonus.textContent =
        formatCurrency(bonusPay);


    gross.textContent =
        formatCurrency(grossPay);


    tax.textContent =
        "-" + formatCurrency(taxAmount);


    pension.textContent =
        "-" + formatCurrency(pensionAmount);


    medicalAid.textContent =
        "-" + formatCurrency(medicalAidAmount);


    totalDeductions.textContent =
        "-" + formatCurrency(deductions);


    netPay.textContent =
        formatCurrency(netSalary);


    emptyState.classList.add("hidden");

    payslip.classList.remove("hidden");

});


downloadPdfBtn.addEventListener("click", () => {


    if (payslip.classList.contains("hidden")) {

        alert("Please generate a payslip first.");

        return;

    }


    downloadPdfBtn.style.display = "none";

    printBtn.style.display = "none";


    const options = {

        margin: 5,

        filename: `${empName.textContent}-Payslip.pdf`,

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {

            scale: 1.5,

            scrollY: 0,

            useCORS: true

        },

        jsPDF: {

            unit: "mm",

            format: "a4",

            orientation: "portrait"

        },

        pagebreak: {

            mode: [
                "avoid-all",
                "css",
                "legacy"
            ]

        }

    };


    html2pdf()

        .set(options)

        .from(payslip)

        .save()

        .then(() => {


            downloadPdfBtn.style.display = "";

            printBtn.style.display = "";


            const message =
                document.getElementById("downloadMessage");


            if (message) {

                message.classList.add("show");


                setTimeout(() => {

                    message.classList.remove("show");

                }, 3000);

            }


        })


        .catch(() => {


            downloadPdfBtn.style.display = "";

            printBtn.style.display = "";


            alert("Unable to generate PDF.");


        });


});


printBtn.addEventListener("click", () => {

    window.print();

});

function logout() {

    window.location.href = "index.html";

}


function displayCurrentDate() {

    const today = new Date();


    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };


    const dateElement =
        document.getElementById("currentDate");


    if (dateElement) {

        dateElement.textContent =
            today.toLocaleDateString("en-GB", options);

    }

}


window.addEventListener("DOMContentLoaded", () => {

    loadEmployees();

    updateSummary();

    displayCurrentDate();


    emptyState.classList.remove("hidden");

});