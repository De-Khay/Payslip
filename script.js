// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I",
  authDomain: "inventory-tracker-251d9.firebaseapp.com",
  projectId: "inventory-tracker-251d9",
  storageBucket: "inventory-tracker-251d9.appspot.com",
  messagingSenderId: "687688694025",
  appId: "1:687688694025:web:8687bfa31dc57a5177bbd8",
  measurementId: "G-XLKM7VBSSD"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');

const nextStep1Button = document.getElementById('nextStep1');
const prevStep2Button = document.getElementById('prevStep2');
const submitButton = document.getElementById('submit');

nextStep1Button.addEventListener('click', () => {
  if (validateStep1()) {
    step1.style.display = 'none';
    step2.style.display = 'block';
  }
});

prevStep2Button.addEventListener('click', () => {
  step2.style.display = 'none';
  step1.style.display = 'block';
});

submitButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  if (validateStep2()) {
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      otherName: document.getElementById('otherName').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      address1: document.getElementById('address1').value,
      address2: document.getElementById('address2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      country: document.getElementById('country').value,
      gender: document.getElementById('gender').value,
      staffId: document.getElementById('staffId').value,
      department: document.getElementById('department').value,
      designation: document.getElementById('designation').value,
      unit: document.getElementById('unit').value,
      paymentInfo: document.getElementById('paymentInfo').value,
      baseSalary: parseFloat(document.getElementById('baseSalary').value),
      gross: parseFloat(document.getElementById('gross').value),
      net: parseFloat(document.getElementById('net').value),
      allowance: parseFloat(document.getElementById('allowance').value),
      tax: parseFloat(document.getElementById('tax').value),
      pension: parseFloat(document.getElementById('pension').value),
      payPeriod: document.getElementById('payPeriod').value,
      entitlement: document.getElementById('entitlement').value,
    };

    try {
      await addPayslipToFirestore(formData);
      console.log('Payslip added successfully!');
      // Optionally, show success message or redirect
    } catch (error) {
      console.error('Error adding payslip:', error);
      // Handle error (e.g., display error message to user)
    }
  }
});

// Form validation for Step 1
function validateStep1() {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'address1',
    'city',
    'state',
    'country',
    'gender',
    'staffId',
    'department',
    'designation',
    'unit',
  ];
  for (const field of requiredFields) {
    const value = document.getElementById(field).value;
    if (!value) {
      alert(`Please fill out ${field}`);
      return false;
    }
  }
  return true;
}

// Form validation for Step 2
function validateStep2() {
  const requiredFields = [
    'paymentInfo',
    'baseSalary',
    'gross',
    'net',
    'allowance',
    'tax',
    'pension',
    'payPeriod',
    'entitlement',
  ];
  for (const field of requiredFields) {
    const value = document.getElementById(field).value;
    if (!value.trim()) {
      alert(`Please provide ${field}`);
      return false;
    }
  }

  // Additional validation (e.g., numeric fields)
  const numericFields = [
    'baseSalary',
    'gross',
    'net',
    'allowance',
    'tax',
    'pension',
  ];
  for (const field of numericFields) {
    const value = parseFloat(document.getElementById(field).value);
    if (isNaN(value) || value <= 0) {
      alert(`Invalid ${field}. Please enter a valid positive number`);
      return false;
    }
  }

  return true;
}

async function addPayslipToFirestore(formData) {
  try {
    const payslipsCollection = collection(db, 'payslip');
    const docRef = await addDoc(payslipsCollection, formData);
    console.log('Payslip added successfully with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding payslip:', error);
    throw error; // Rethrow the error if needed
  }
}

<<<<<<< HEAD
=======
async function populateForm() {
  const id = document.getElementById('id').value;
  try {
      // Get the document corresponding to the ID
      const docSnap = await getDoc(doc(db, 'payslip', id));
      if (docSnap.exists()) {
          const data = docSnap.data();
          // Populate form fields with retrieved data
          document.getElementById('firstName').value = data.firstName;
          document.getElementById('lastName').value = data.lastName;
          document.getElementById('otherName').value = data.otherName;
          document.getElementById('email').value = data.email;
          document.getElementById('phoneNumber').value = data.phoneNumber;
          document.getElementById('address1').value = data.address1;
          document.getElementById('address2').value = data.address2;
          document.getElementById('city').value = data.city;
          document.getElementById('state').value = data.state;
          document.getElementById('country').value = data.country;
          document.getElementById('gender').value = data.gender;
          document.getElementById('staffId').value = data.staffId;
          document.getElementById('department').value = data.department;
          document.getElementById('designation').value = data.designation;
          document.getElementById('unit').value = data.unit;
          document.getElementById('paymentInfo').value = data.paymentInfo;
          document.getElementById('baseSalary').value = data.baseSalary;
          document.getElementById('gross').value = data.gross;
          document.getElementById('net').value = data.net;
          document.getElementById('allowance').value = data.allowance;
          document.getElementById('tax').value = data.tax;
          document.getElementById('pension').value = data.pension;
          document.getElementById('payPeriod').value = data.payPeriod;
          document.getElementById('entitlement').value = data.entitlement;

          document.getElementById('errorMessage').innerText = ''; // Clear error message if any
      } 
      else {
          console.error('No such document exists!');
          document.getElementById('errorMessage').innerText = 'No document found with that ID.';
      }
  } catch (error) {
      console.error('Error getting document:', error);
      document.getElementById('errorMessage').innerText = 'Error getting document. Please try again later.';
  }
  console.log(data)
}

document.addEventListener('DOMContentLoaded', () => {
  const staffIdInput = document.getElementById('staffIdInput');
  const baseSalaryInput = document.getElementById('baseSalary');
  const taxInput = document.getElementById('tax');
  const pensionInput = document.getElementById('pension');
  const latenessFeeInput = document.getElementById('latenessFee');
  const absentFeeInput = document.getElementById('absentFee');
  const salaryResultElement = document.getElementById('salaryResult');

  if (staffIdInput) {
      staffIdInput.addEventListener('change', async () => {
          const staffId = staffIdInput.value;

          try {
              const docSnap = await getDoc(doc(db, 'payslip', staffId));
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  // Populate form fields with retrieved data
                  for (const field in data) {
                      const fieldElement = document.getElementById(field);
                      if (fieldElement) {
                          fieldElement.value = data[field];
                      }
                  }
              } else {
                  console.error('No such document exists!');
                  // Optionally, display a message indicating staff details are not found
              }
          } catch (error) {
              console.error('Error getting document:', error);
              // Handle error (e.g., display an error message)
          }
      });
  }

  if (baseSalaryInput && taxInput && pensionInput && latenessFeeInput && absentFeeInput && salaryResultElement) {
      function calculateSalary() {
          const baseSalary = parseFloat(baseSalaryInput.value) || 0;
          const tax = parseFloat(taxInput.value) || 0.075; // Tax rate as 7.5%
          const pension = parseFloat(pensionInput.value) || 0.075; // Pension rate as 7.5%
          const latenessFee = parseFloat(latenessFeeInput.value) || 0;
          const absentFee = parseFloat(absentFeeInput.value) || 0;

          // Calculate net salary
          const netSalary = baseSalary * (1 - tax - pension) - latenessFee - absentFee;

          // Display the calculated net salary
          salaryResultElement.innerText = `Net Salary: $${netSalary.toFixed(2)}`;
      }
  } else {
      console.error('One or more input elements not found.');
  }
});
>>>>>>> 920fff1845d817f4478510344f897c29e35222ab
