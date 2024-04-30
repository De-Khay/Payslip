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
    const containerDiv = document.createElement('div'); // Container div to hold both tables
    containerDiv.classList.add('table-container'); // Add a class for styling

    // Create table 1
    const table1 = document.createElement('table');
    table1.classList.add('staff-details'); // Add a class for styling

    // Create table 2
    const table2 = document.createElement('table');
    table2.classList.add('staff-details'); // Add a class for styling

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
                
                function populateTable(table, payslipData, fields) {
                    fields.forEach(field => {
                        const row = document.createElement('tr');
                        const keyCell = document.createElement('td');
                        keyCell.textContent = field === 'Employee Name' ? field : field.replace(/([A-Z])/g, ' $1').trim(); // Add spaces before capital letters
                        const valueCell = document.createElement('td');
                
                        if (field === 'Employee Name') {
                            // Concatenate firstName, lastName, and otherName for employee name
                            valueCell.textContent = `${payslipData.lastName} ${payslipData.firstName} ${payslipData.otherName}`;
                        } else if (field === 'Employee Address') {
                            // Concatenate address fields
                            const address = `${payslipData.address1}, ${payslipData.address2}, ${payslipData.city}, ${payslipData.state}, ${payslipData.country}`;
                            valueCell.textContent = address;
                        } else {
                            valueCell.textContent = payslipData[field] || ''; // If field value is empty, display an empty string
                        }
                
                        row.appendChild(keyCell);
                        row.appendChild(valueCell);
                        table.appendChild(row);
                    });
                }
                

                // Define fields for table 1
                const fieldsTable1 = [
                    'Employee Name',
                    'phoneNumber',
                    'email',
                    'Employee Address',
                    'gender',
                    'staffId',
                    'department',
                    'designation',
                    'unit'
                ];

                // Define fields for table 2
                const fieldsTable2 = [
                    'paymentInfo',
                    'baseSalary',
                    'gross',
                    'net',
                    'allowance',
                    'tax',
                    'pension',
                    'payPeriod',
                    'entitlement'
                ];

                // Populate table 1
                populateTable(table1, payslipData, fieldsTable1);

                // Populate table 2
                populateTable(table2, payslipData, fieldsTable2);

                // Append tables to the container div
                containerDiv.appendChild(table1);
                containerDiv.appendChild(table2);

                // Append container div to the staffDetailsElement
                staffDetailsElement.appendChild(containerDiv);
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

function populateTable(table, payslipData, fields) {
    fields.forEach(field => {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        keyCell.textContent = field;
        const valueCell = document.createElement('td');
        valueCell.textContent = payslipData[field] || ''; // If field value is empty, display an empty string
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    });
}
