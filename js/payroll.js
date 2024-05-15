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

    // Add "Details" button
    const detailsCell = row.insertCell();
    const detailsButton = document.createElement('button');
    detailsButton.innerHTML = 'Details';
    detailsButton.classList.add('details-button');
    detailsButton.setAttribute('data-staff-id', payslipData.staffId);
    detailsCell.appendChild(detailsButton);

    // Add "Email" button
    const emailCell = row.insertCell();
    const emailButton = document.createElement('button');
    emailButton.innerHTML = '<i class="fas fa-envelope"></i>';
    emailButton.classList.add('email-button');
    emailButton.addEventListener('click', () => {
      const email = payslipData.email;
      window.location.href = `mailto:${email}`;
    });
    emailCell.appendChild(emailButton);

    // Add "Print" button
    const printCell = row.insertCell();
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.classList.add('print-button');
    printButton.addEventListener('click', () => {
      printStaffDetails(payslipData); // Call function to print staff details
    });
    printCell.appendChild(printButton);

    // Add "Edit" button
    const editCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => {
      showStaffDetailsPopup(payslipData);
    });
    editCell.appendChild(editButton);
  });

  // Clear existing content and append table to the element
  staffDetailsElement.innerHTML = '';
  staffDetailsElement.appendChild(table);
}

// Define the calculateTotals function globally
function calculateTotals() {
    // Calculate totals dynamically
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const pension = parseFloat(document.getElementById('pension').value) || 0;
    const latenessFee = parseFloat(document.getElementById('latenessFee').value) || 0;
    const absenceFee = parseFloat(document.getElementById('absenceFee').value) || 0;
    const salaryAdvance = parseFloat(document.getElementById('salaryAdvance').value) || 0;
    const loan = parseFloat(document.getElementById('loan').value) || 0;
    const missedDeliverables = parseFloat(document.getElementById('missedDeliverables').value) || 0;
    const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
  
    const totalDebits = taxRate + pension + latenessFee + absenceFee + salaryAdvance + loan + missedDeliverables + otherDeductions;
    
    // Update total debit value in the popup
    document.getElementById('totalDebits').textContent = totalDebits;
  
    // Calculate and update total amount payable
    const totalCredit = parseFloat(document.getElementById('totalCredit').textContent) || 0;
    const totalPayable = totalCredit - totalDebits;
    document.getElementById('totalPayable').textContent = totalPayable;
  }
  
  function showStaffDetailsPopup(payslipData) {
    // Create a popup/modal
    const popup = document.createElement('div');
    popup.classList.add('popup');
  
    const content = document.createElement('div');
    content.classList.add('popup-content');
  
    // Populate popup content with staff details, deductions, and allowances
    content.innerHTML = `
      <h2>${payslipData.firstName} ${payslipData.lastName}</h2>
      <p><strong>Department:</strong> ${payslipData.department}</p>
      <p><strong>Base Salary:</strong> ${payslipData.baseSalary}</p>
  
      <h3>Deductions</h3>
      <table>
        <tr>
          <td>Tax Rate (7.5%):</td>
          <td><input type="number" id="taxRate" value="${payslipData.baseSalary * 0.075}"></td>
        </tr>
        <tr>
          <td>Pension (8%):</td>
          <td><input type="number" id="pension" value="${payslipData.baseSalary * 0.08}"></td>
        </tr>
        <tr>
          <td>Lateness Fee:</td>
          <td><input type="number" id="latenessFee"></td>
        </tr>
        <tr>
          <td>Absence Fee:</td>
          <td><input type="number" id="absenceFee"></td>
        </tr>
        <tr>
          <td>Salary Advance:</td>
          <td><input type="number" id="salaryAdvance"></td>
        </tr>
        <tr>
          <td>Loan:</td>
          <td><input type="number" id="loan"></td>
        </tr>
        <tr>
          <td>Missed Deliverables:</td>
          <td><input type="number" id="missedDeliverables"></td>
        </tr>
        <tr>
          <td>Other Deductions:</td>
          <td><input type="number" id="otherDeductions"></td>
        </tr>
      </table>
  
      <h3>Allowances</h3>
      <table>
        <tr>
          <td>Bonus:</td>
          <td><input type="number" id="bonus"></td>
        </tr>
        <tr>
          <td>Extra Hours/Days:</td>
          <td><input type="number" id="extraHoursDays"></td>
        </tr>
      </table>
  
      <p><button onclick="calculateTotals()">Calculate Totals</button></p>
      <p><strong>Total Credit:</strong> <span id="totalCredit"></span></p>
      <p><strong>Total Debits:</strong> <span id="totalDebits"></span></p>
      <p><strong>Total Amount Payable:</strong> <span id="totalPayable"></span></p>
    `;
  
    popup.appendChild(content);
    document.body.appendChild(popup);
  }
  

function printStaffDetails(payslipData) {
  // Construct printable content
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

  // Create a new window for printing
  const printWindow = window.open('', '_blank');

  // Write printable content to the new window
  printWindow.document.open();
  printWindow.document.write(`
      <html>
        <head>
          <title>Employee Details</title>
        </head>
        <body>
          ${printableContent}
          <script>
            // Automatically trigger print dialog on window load
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `);
  printWindow.document.close();
}

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
