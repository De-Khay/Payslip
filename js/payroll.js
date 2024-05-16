// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I',
  authDomain: 'inventory-tracker-251d9.firebaseapp.com',
  projectId: 'inventory-tracker-251d9',
  storageBucket: 'inventory-tracker-251d9.appspot.com',
  messagingSenderId: '687688694025',
  appId: '1:687688694025:web:8687bfa31dc57a5177bbd8',
  measurementId: 'G-XLKM7VBSSD',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

document.addEventListener('DOMContentLoaded', async () => {
  const staffDetailsElement = document.getElementById('staffDetails');

  try {
    // Query all documents from the payslip collection
    const payslipCollection = collection(db, 'payslip');
    const querySnapshot = await getDocs(payslipCollection);

    if (!querySnapshot.empty) {
      const pageSize = 10;
      let currentPage = 1;
      let totalPages = Math.ceil(querySnapshot.size / pageSize);

      // Display initial page
      displayPayslips(querySnapshot.docs, currentPage, pageSize);

      // Pagination controls
      const prevButton = document.getElementById('prevButton');
      const nextButton = document.getElementById('nextButton');

      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          displayPayslips(querySnapshot.docs, currentPage, pageSize);
        }
      });

      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayPayslips(querySnapshot.docs, currentPage, pageSize);
        }
      });
    } else {
      staffDetailsElement.innerHTML =
        '<p>No Staff Records found in the collection.</p>';
      console.error('No Records found in the collection.');
    }
  } catch (error) {
    console.error('Error fetching payslips:', error);
    staffDetailsElement.innerHTML = `<p>Error fetching payslips: ${error.message}</p>`;
  }
});

function displayPayslips(docs, currentPage, pageSize) {
  const staffDetailsElement = document.getElementById('staffDetails');
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDocs = docs.slice(startIndex, endIndex);

  const table = document.createElement('table');
  const headers = [
    'S/N',
    'Employee Name',
    'Email',
    'Salary',
    'Role',
    'Actions',
  ];

  // Create table headers
  const headerRow = table.insertRow();
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Populate table rows with payslip data
  let serialNumber = startIndex + 1;
  paginatedDocs.forEach((doc) => {
    const payslipData = doc.data();
    const row = table.insertRow();
    row.insertCell().textContent = serialNumber++;
    row.insertCell().textContent = `${payslipData.firstName} ${payslipData.lastName}`;
    row.insertCell().textContent = payslipData.email;
    row.insertCell().textContent = payslipData.baseSalary;
    row.insertCell().textContent = payslipData.designation;

    // Add action buttons
    const actionsCell = row.insertCell();

    // Details Button
    const detailsButton = document.createElement('button');
    detailsButton.innerHTML = 'Details';
    detailsButton.classList.add('details-button');
    detailsButton.setAttribute('data-staff-id', payslipData.staffId);
    detailsButton.addEventListener('click', () => {
      showStaffDetailsPopup(payslipData);
    });
    actionsCell.appendChild(detailsButton);

    // Email Button
    const emailButton = document.createElement('button');
    emailButton.innerHTML = '<i class="fas fa-envelope"></i>';
    emailButton.classList.add('email-button');
    emailButton.addEventListener('click', () => {
      const email = payslipData.email;
      window.location.href = `mailto:${email}`;
    });
    actionsCell.appendChild(emailButton);

    // Print Button
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.classList.add('print-button');
    printButton.addEventListener('click', () => {
      printStaffDetails(payslipData);
    });
    actionsCell.appendChild(printButton);

    // Edit Button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
      showStaffDetailsPopup(payslipData);
    });
    actionsCell.appendChild(editButton);
  });

  // Clear existing content and append table to the element
  staffDetailsElement.innerHTML = '';
  staffDetailsElement.appendChild(table);
}

function showStaffDetailsPopup(payslipData) {
  const popup = document.getElementById('staffDetailsPopup');
  const popupEmployeeName = document.getElementById('popupEmployeeName');
  const popupDepartment = document.getElementById('popupDepartment');
  const popupBaseSalary = document.getElementById('popupBaseSalary');

  if (!popup || !popupEmployeeName || !popupDepartment || !popupBaseSalary) {
    console.error('Popup elements not found.');
    return;
  }

  // Populate popup content with payslip data
  popupEmployeeName.textContent = `${payslipData.firstName} ${payslipData.lastName}`;
  popupDepartment.textContent = payslipData.department;
  popupBaseSalary.textContent = payslipData.baseSalary;

  // Populate deductions with predefined percentages
  const taxRateInput = document.getElementById('taxRate');
  const pensionInput = document.getElementById('pension');

  if (taxRateInput && pensionInput) {
    taxRateInput.value = (payslipData.baseSalary * 0.075).toFixed(2); // 7.5% tax
    pensionInput.value = (payslipData.baseSalary * 0.08).toFixed(2); // 8% pension
  }

  // Show the popup
  popup.style.display = 'block';

  // Attach event listeners to input fields to trigger calculation
  const inputFields = [
    taxRateInput,
    pensionInput,
    document.getElementById('latenessFee'),
    document.getElementById('absenceFee'),
    document.getElementById('salaryAdvance'),
    document.getElementById('loan'),
    document.getElementById('missedDeliverables'),
    document.getElementById('otherDeductions'),
    document.getElementById('bonus'),
    document.getElementById('extraHoursDays'),
    document.getElementById('overtimePay'),
    document.getElementById('commission'),
    document.getElementById('travelAllowance'),
  ];

  // Add input event listeners to all input fields
  inputFields.forEach((inputField) => {
    if (inputField) {
      inputField.addEventListener('input', calculateTotals);
    }
  });

  // Initial calculation
  calculateTotals();
}

function calculateTotals() {
  const baseSalary =
    parseFloat(document.getElementById('popupBaseSalary').textContent) || 0;
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const pension = parseFloat(document.getElementById('pension').value) || 0;
  const latenessFee =
    parseFloat(document.getElementById('latenessFee').value) || 0;
  const absenceFee =
    parseFloat(document.getElementById('absenceFee').value) || 0;
  const salaryAdvance =
    parseFloat(document.getElementById('salaryAdvance').value) || 0;
  const loan = parseFloat(document.getElementById('loan').value) || 0;
  const missedDeliverables =
    parseFloat(document.getElementById('missedDeliverables').value) || 0;
  const otherDeductions =
    parseFloat(document.getElementById('otherDeductions').value) || 0;
  const bonus = parseFloat(document.getElementById('bonus').value) || 0;
  const extraHoursDays =
    parseFloat(document.getElementById('extraHoursDays').value) || 0;
  const overtimePay =
    parseFloat(document.getElementById('overtimePay').value) || 0;
  const commission =
    parseFloat(document.getElementById('commission').value) || 0;
  const travelAllowance =
    parseFloat(document.getElementById('travelAllowance').value) || 0;

  // Calculate total debits
  const totalDebits =
    taxRate +
    pension +
    latenessFee +
    absenceFee +
    salaryAdvance +
    loan +
    missedDeliverables +
    otherDeductions;

  // Calculate total credit
  const totalCredit =
    baseSalary +
    bonus +
    extraHoursDays +
    overtimePay +
    commission +
    travelAllowance;

  // Display calculated totals
  document.getElementById('totalCredit').textContent = totalCredit.toFixed(2);
  document.getElementById('totalDebits').textContent = totalDebits.toFixed(2);

  // Calculate total payable amount
  const totalPayable = totalCredit - totalDebits;
  document.getElementById('totalPayable').textContent = totalPayable.toFixed(2);
}

function printStaffDetails(payslipData) {
  const printableContent = `
        <h2>Employee Details</h2>
        <p><strong>Staff ID:</strong> ${payslipData.staffId}</p>
        <p><strong>First Name:</strong> ${payslipData.firstName}</p>
        <p><strong>Last Name:</strong> ${payslipData.lastName}</p>
        <p><strong>Other Name:</strong> ${payslipData.otherName}</p>
        <p><strong>Email:</strong> ${payslipData.email}</p>
        <p><strong>Phone Number:</strong> ${payslipData.phoneNumber}</p>
        <p><strong>Department:</strong> ${payslipData.department}</p>
        <p><strong>Base Salary:</strong> ${payslipData.baseSalary}</p>
      `;

  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
        <html>
          <head>
            <title>Employee Details</title>
          </head>
          <body>
            ${printableContent}
            <script>
              window.onload = () => window.print();
            </script>
          </body>
        </html>
      `);
  printWindow.document.close();
}

// Optional: You can add jQuery event handlers here if needed

$('.menu > ul > li').click(function (e) {
  // Remove the 'active' class from other menu items
  $(this).siblings().removeClass('active');
  // Toggle the 'active' class on the clicked menu item
  $(this).toggleClass('active');
  // Toggle the visibility of the submenu
  $(this).find('ul').slideToggle();
  // Close other submenus if they are open
  $(this).siblings().find('ul').slideUp();
  // Remove the 'active' class from submenu items
  $(this).siblings().find('ul').find('li').removeClass('active');
});

$('.menu-btn').click(function () {
  // Toggle the 'active' class on the sidebar
  $('.sidebar').toggleClass('active');
});
