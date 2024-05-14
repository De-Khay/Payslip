import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I',
  authDomain: 'inventory-tracker-251d9.firebaseapp.com',
  projectId: 'inventory-tracker-251d9',
  storageBucket: 'inventory-tracker-251d9.appspot.com',
  messagingSenderId: '687688694025',
  appId: '1:687688694025:web:8687bfa31dc57a5177bbd8',
  measurementId: 'G-XLKM7VBSSD',
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Function to fetch and display total number of employees
async function getTotalEmployees() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    const totalEmployees = querySnapshot.size;
    document.getElementById('totalEmployees').textContent = totalEmployees;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Function to fetch and display total number of female staff
async function getTotalFemaleStaff() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    let femaleCount = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().gender === 'female') {
        femaleCount++;
      }
    });
    document.getElementById('totalFemale').textContent = femaleCount;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Function to fetch and display total number of male staff
async function getTotalMaleStaff() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    let maleCount = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().gender === 'male') {
        maleCount++;
      }
    });
    document.getElementById('totalMale').textContent = maleCount;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Function to fetch and display total number of Technical Services staff
async function getTotalTechnicalServicesStaff() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    let technicalServicesCount = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().department === 'Technical Services') {
        technicalServicesCount++;
      }
    });
    document.getElementById('totalTs').textContent = technicalServicesCount;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Function to fetch and display total number of Financial Services staff
async function getTotalFinancialServicesStaff() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    let financialServicesCount = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().department === 'Financial Services') {
        financialServicesCount++;
      }
    });
    document.getElementById('totalFs').textContent = financialServicesCount;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Function to fetch and display total number of General Services staff
async function getTotalGeneralServicesStaff() {
  try {
    const querySnapshot = await getDocs(collection(db, 'payslip'));
    let generalServicesCount = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().department === 'General Services') {
        generalServicesCount++;
      }
    });
    document.getElementById('totalGs').textContent = generalServicesCount;
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
}

// Call the functions to fetch and display total number of employees, female, male, and IT staff when the page loads
window.onload = function () {
  getTotalEmployees();
  getTotalFemaleStaff();
  getTotalMaleStaff();
  getTotalTechnicalServicesStaff();
  getTotalFinancialServicesStaff();
  getTotalGeneralServicesStaff();
};

// Function to fetch salary data from Firestore
async function fetchSalaryData() {
  const salaryData = {};
  const querySnapshot = await getDocs(collection(db, 'payslip'));
  querySnapshot.forEach((doc) => {
    const department = doc.data().department;
    const baseSalary = doc.data().baseSalary || 0; // Ensure baseSalary is valid
    if (!salaryData[department]) {
      salaryData[department] = baseSalary;
    } else {
      salaryData[department] += baseSalary; // Aggregate base salary for the same department
    }
  });
  return salaryData;
}

// Function to fetch department distribution data from Firestore
async function fetchDepartmentData() {
  const departmentData = {};
  const querySnapshot = await getDocs(collection(db, 'payslip'));
  querySnapshot.forEach((doc) => {
    const department = doc.data().department;
    if (!departmentData[department]) {
      departmentData[department] = 1;
    } else {
      departmentData[department] += 1; // Count number of employees in each department
    }
  });
  return departmentData;
}

// Function to fetch base salary data for graph from Firestore
async function fetchBaseSalaryData() {
  const baseSalaryData = {};
  const querySnapshot = await getDocs(collection(db, 'payslip'));
  querySnapshot.forEach((doc) => {
    const month = doc.data().month;
    const baseSalary = doc.data().baseSalary || 0; // Ensure baseSalary is valid
    baseSalaryData[month] = baseSalary;
  });
  return baseSalaryData;
}

// Function to fetch pension and tax data from Firestore
async function fetchPensionTaxData() {
  const pensionData = { total: 0 };
  const taxData = { total: 0 };
  const querySnapshot = await getDocs(collection(db, 'payslip'));
  querySnapshot.forEach((doc) => {
    const pension = doc.data().pension || 0;
    const tax = doc.data().tax || 0;
    pensionData.total += pension;
    taxData.total += tax;
  });
  return { pensionData, taxData };
}

function renderSalaryBarChart(salaryData) {
  const ctx = document.getElementById('salaryChartCanvas').getContext('2d');
  const salaryChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(salaryData),
      datasets: [
        {
          label: 'Base Salary',
          data: Object.values(salaryData),
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function renderDepartmentPieChart(departmentData) {
  const ctx = document.getElementById('departmentChartCanvas').getContext('2d');
  const departmentChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(departmentData),
      datasets: [
        {
          label: 'Departments',
          data: Object.values(departmentData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

function renderGraphs(baseSalaryData, pensionData, taxData) {
  const salaryGraphCtx = document
    .getElementById('salaryGraphCanvas')
    .getContext('2d');
  const pensionTaxGraphCtx = document
    .getElementById('pensionTaxGraphCanvas')
    .getContext('2d');

  // Salary graph
  const salaryGraph = new Chart(salaryGraphCtx, {
    type: 'line',
    data: {
      labels: Object.keys(baseSalaryData),
      datasets: [
        {
          label: 'Base Salary',
          data: Object.values(baseSalaryData),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });

  // Pension & Tax graph
  const pensionTaxGraph = new Chart(pensionTaxGraphCtx, {
    type: 'bar',
    data: {
      labels: ['Total Pensions', 'Total Tax'],
      datasets: [
        {
          label: 'Amount',
          data: [pensionData.total, taxData.total],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Display total pensions and tax
  document.getElementById('totalPensions').textContent = pensionData.total;
  document.getElementById('totalTax').textContent = taxData.total;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch data from Firestore and render charts
    const salaryData = await fetchSalaryData();
    const departmentData = await fetchDepartmentData();
    const baseSalaryData = await fetchBaseSalaryData();
    const { pensionData, taxData } = await fetchPensionTaxData();

    // Render charts using fetched data
    renderSalaryBarChart(salaryData);
    renderDepartmentPieChart(departmentData);
    renderGraphs(baseSalaryData, pensionData, taxData);
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
});
