// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I',
  authDomain: 'inventory-tracker-251d9.firebaseapp.com',
  projectId: 'inventory-tracker-251d9',
  storageBucket: 'inventory-tracker-251d9.appspot.com',
  messagingSenderId: '687688694025',
  appId: '1:687688694025:web:3212fc7a4ec0f6af77bbd8',
  measurementId: 'G-9DGC2CVT6Y',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Function to populate form fields based on ID
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
  
  