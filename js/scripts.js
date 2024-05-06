// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  where,
  query,
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
  const staffIdInput = document.getElementById('staffIdInput');
  const baseSalaryInput = document.getElementById('baseSalary');
  const taxInput = document.getElementById('tax');
  const pensionInput = document.getElementById('pension');
  const staffDetailsElement = document.getElementById('staffDetails');
  
  // Function to calculate tax amount
  function calculateTax(baseSalary) {
    return baseSalary * 0.075; // Tax rate as 7.5%
  }

  // Function to calculate pension amount
  function calculatePension(baseSalary) {
    return baseSalary * 0.08; // Pension rate as 8%
  }

  // Event listener to update tax and pension amounts when baseSalary changes
  baseSalaryInput.addEventListener('input', () => {
    const baseSalary = parseFloat(baseSalaryInput.value) || 0;
    const taxAmount = calculateTax(baseSalary);
    const pensionAmount = calculatePension(baseSalary);
    taxInput.value = taxAmount.toFixed(2); // Display tax amount in the tax input field
    pensionInput.value = pensionAmount.toFixed(2); // Display pension amount in the pension input field
  });

  document.getElementById('fetchDetailsButton').addEventListener('click', async () => {
    const staffId = staffIdInput.value.trim();

    try {
      // Query the payslip collection where 'staffId' field matches the input staffId
      const payslipQuery = query(
        collection(db, 'payslip'),
        where('staffId', '==', staffId)
      );
      const querySnapshot = await getDocs(payslipQuery);

      if (!querySnapshot.empty) {
        const payslipData = querySnapshot.docs[0].data(); // Assuming only one document is found

        // Create a container for the fetched details
        const fetchedDetailsContainer = document.createElement('div');
        fetchedDetailsContainer.classList.add('fetched-details-container');
        fetchedDetailsContainer.style.border = '2px solid black'; // Add border

        // Clear previous staff details
        staffDetailsElement.innerHTML = '';

        // Display specific payslip details
        const detailsList = document.createElement('ul');
        const fieldsToShow = [
          'staffId',
          'firstName',
          'lastName',
          'otherName',
          'email',
          'phoneNumber',
          'department',
          'baseSalary',
        ];

        fieldsToShow.forEach((field) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${field}: ${payslipData[field]}`;
          detailsList.appendChild(listItem);
        });

        fetchedDetailsContainer.appendChild(detailsList);
        staffDetailsElement.appendChild(fetchedDetailsContainer);
      } else {
        // Display error message when no payslip is found
        staffDetailsElement.innerHTML = `<p>No payslip found for Staff ID: ${staffId}</p>`;
        console.error('No payslip found for the provided Staff ID.');
      }
    } catch (error) {
      console.error('Error fetching payslip:', error);
      // Handle error (e.g., display an error message)
      staffDetailsElement.innerHTML = `<p>Error fetching payslip: ${error.message}</p>`;
    }
  });

  // Function to format currency with commas for thousands separation
  function formatCurrency(amount) {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calculateNetSalary() {
    const baseSalary = parseFloat(baseSalaryInput.value) || 0;
    const taxRate = 0.075; // Tax rate as 7.5%
    const pensionRate = 0.075; // Pension rate as 7.5%
    const latenessFee = parseFloat(document.getElementById('latenessFee').value) || 0;
    const absentFee = parseFloat(document.getElementById('absentFee').value) || 0;
    const salaryAdvance = parseFloat(document.getElementById('salaryAdvance').value) || 0;
    const loan = parseFloat(document.getElementById('loan').value) || 0;
    const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
    const otherAllowances = parseFloat(document.getElementById('otherAllowances').value) || 0;

    // Calculate tax and pension deductions
    const taxAmount = baseSalary * taxRate;
    const pensionAmount = baseSalary * pensionRate;

    // Calculate total deductions
    const totalDeductions = taxAmount + pensionAmount + latenessFee + absentFee + salaryAdvance + loan + otherDeductions;

    // Calculate net salary after deductions
    let netSalary = baseSalary + otherAllowances - totalDeductions;

    // Ensure net salary is not negative
    netSalary = netSalary < 0 ? 0 : netSalary;

    // Format net salary with commas
    const formattedNetSalary = formatCurrency(netSalary);

    // Display the calculated net salary
    const netSalaryResultElement = document.getElementById('netSalaryResult');
    if (netSalaryResultElement) {
        netSalaryResultElement.textContent = `Net Salary: ₦${formattedNetSalary}`;
    }
  }

  // Call the calculateNetSalary function when the Calculate Net Salary button is clicked
  const calculateButton = document.getElementById('calculateButton');
  if (calculateButton) {
      calculateButton.addEventListener('click', calculateNetSalary);
  }
});