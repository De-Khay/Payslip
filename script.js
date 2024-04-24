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

