// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
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

    // Get the staffId from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const staffId = urlParams.get('staffId');

    try {
        // Query Firestore to get details of the staff with the given staffId
        const payslipCollection = collection(db, 'payslip');
        const querySnapshot = await getDocs(payslipCollection);

        if (!querySnapshot.empty) {
            const matchingDoc = querySnapshot.docs.find(doc => doc.data().staffId === staffId);
            if (matchingDoc) {
                staffDetailsElement.innerHTML = ''; // Clear previous details
                const payslipData = matchingDoc.data();
                const staffDetails = document.createElement('div');
                staffDetails.classList.add('staff-details');
                Object.keys(payslipData).forEach(key => {
                    const fieldElement = document.createElement('p');
                    fieldElement.innerHTML = `<strong>${key}:</strong> ${payslipData[key]}`;
                    staffDetails.appendChild(fieldElement);
                });
                staffDetailsElement.appendChild(staffDetails);
            } else {
                staffDetailsElement.innerHTML = '<p>No matching payslip found.</p>';
                console.error('No matching payslip found.');
            }
        } else {
            // Display message when no payslips are found
            staffDetailsElement.innerHTML = '<p>No payslips found in the collection.</p>';
            console.error('No payslips found in the collection.');
        }
    } catch (error) {
        console.error('Error fetching payslips:', error);
        // Handle error (e.g., display an error message)
        staffDetailsElement.innerHTML = `<p>Error fetching payslips: ${error.message}</p>`;
    }
});
