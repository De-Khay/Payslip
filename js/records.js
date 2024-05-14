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
      const headers = ['S/N', 'Staff ID', 'Employee Name', 'Phone', 'Email', 'Department', 'Unit', 'Actions', 'Payment'];

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
        detailsButton.innerHTML = ' Details';
        detailsButton.classList.add('details-button');
        detailsButton.setAttribute('data-staff-id', payslipData.staffId); // Set staff ID as custom attribute
        detailsCell.appendChild(detailsButton);

        // Add click event listener to the details button
        detailsButton.addEventListener('click', () => {
          const staffId = payslipData.staffId;
          const modalContent = document.getElementById('modal-content');

          // Populate modal content with payslip details
          modalContent.innerHTML = `
            <h2>Payslip Details</h2>
            <p>Staff ID: ${payslipData.staffId}</p>
            <p>Name: ${payslipData.firstName} ${payslipData.lastName}</p>
            <p>Email: ${payslipData.email}</p>
            <p>Phone Number: ${payslipData.phoneNumber}</p>
            <p>Department: ${payslipData.department}</p>
            <p>Unit: ${payslipData.unit}</p>
            <p>Unit: ${payslipData.unit}</p>
          `;

          // Display the modal
          const modal = document.getElementById('myModal');
          modal.style.display = 'block';
        });
          
        // Add "Edit" button with Font Awesome icon
        const editCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'; // Font Awesome edit icon
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
          // Redirect to salary.html
          window.location.href = 'salary.html';
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



document.addEventListener('DOMContentLoaded', () => {
  const formContainer = document.getElementById('formContainer');
  const overlay = document.getElementById('overlay');

  // Function to open the form container
  function openFormContainer() {
      if (formContainer && overlay) {
          formContainer.style.display = 'block';
          overlay.style.display = 'block';
      }
  }

  // Function to close the form container
  function closeFormContainer() {
      if (formContainer && overlay) {
          formContainer.style.display = 'none';
          overlay.style.display = 'none';
      }
  }

  // Close form container if overlay is clicked
  overlay.addEventListener('click', () => {
      closeFormContainer();
  });

  // Event listener for "Add Staff" button
  const addStaffButton = document.getElementById('addStaffButton');
  if (addStaffButton) {
      addStaffButton.addEventListener('click', () => {
          openFormContainer();
      });
  }

  // Event listener for close button inside form container
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          closeFormContainer();
      });
  }

  // Handle form submission
  const myForm = document.getElementById('myForm');
  if (myForm) {
      myForm.addEventListener('submit', (event) => {
          event.preventDefault();
          // Handle form submission logic here
          console.log('Form submitted');
          closeFormContainer(); // Close the form after submission
      });
  }
});

$(".menu > ul > li").click(function (e) {
  // Remove the 'active' class from other menu items
  $(this).siblings().removeClass("active");
  // Toggle the 'active' class on the clicked menu item
  $(this).toggleClass("active");
  // Toggle the visibility of the submenu
  $(this).find("ul").slideToggle();
  // Close other submenus if they are open
  $(this).siblings().find("ul").slideUp();
  // Remove the 'active' class from submenu items
  $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function () {
  // Toggle the 'active' class on the sidebar
  $(".sidebar").toggleClass("active");
});
