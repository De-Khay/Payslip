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
      // Create a table to display payslip details
      const table = document.createElement('table');
      const headerRow = table.insertRow();
      const headers = ['S/N', 'Staff ID', 'Employee Name', 'Phone', 'Email', 'Department', 'Unit', 'Actions'];

      // Add table headers
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });

      // Populate table rows with payslip data
      let serialNumber = 1;
      querySnapshot.forEach(doc => {
        const payslipData = doc.data();
        const row = table.insertRow();
        row.insertCell().textContent = serialNumber++;
        row.insertCell().textContent = payslipData.staffId;
        row.insertCell().textContent = `${payslipData.firstName} ${payslipData.lastName}`;
        row.insertCell().textContent = payslipData.phoneNumber;
        row.insertCell().textContent = payslipData.email;
        row.insertCell().textContent = payslipData.department;
        row.insertCell().textContent = payslipData.unit;
        
        // Add "Details" button
        const detailsCell = row.insertCell();
        const detailsButton = document.createElement('button');
        detailsButton.innerHTML = '<i class="fas fa-info-circle"></i> Details';
        detailsButton.classList.add('details-button');
        detailsButton.setAttribute('data-staff-id', payslipData.staffId); // Set staff ID as custom attribute
        detailsCell.appendChild(detailsButton);

        // Add click event listener to the details button
        detailsButton.addEventListener('click', () => {
          const staffId = payslipData.staffId;
          // Redirect to details.html with staffId as a query parameter
          window.location.href = `details.html?staffId=${staffId}`;
        });
        
         // Add "Edit" button with Font Awesome icon
         const editCell = row.insertCell();
         const editButton = document.createElement('button');
         editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Font Awesome edit icon
         editButton.classList.add('edit-button');
         editButton.addEventListener('click', () => {
           // Add your logic to edit (e.g., open an edit form)
           console.log('Edit button clicked for staff ID:', payslipData.staffId);
         });
         editCell.appendChild(editButton);
       });
       
      // Append table to the staff details element
      staffDetailsElement.appendChild(table);
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
