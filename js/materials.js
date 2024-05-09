// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWwVoSru9MDFsxgZvR9jCAPmha9dkwn7I",
    authDomain: "inventory-tracker-251d9.firebaseapp.com",
    projectId: "inventory-tracker-251d9",
    storageBucket: "inventory-tracker-251d9.appspot.com",
    messagingSenderId: "687688694025",
    appId: "1:687688694025:web:8687bfa31dc57a5177bbd8",
    measurementId: "G-XLKM7VBSSD"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to show the success modal
function showSuccessModal(message) {
  const modal = document.getElementById('successModal');
  const successMessage = document.getElementById('successMessage');

  // Set the success message content
  successMessage.textContent = message;

  // Show the modal
  modal.style.display = 'block';

  // Close the modal when the user clicks the close button (×)
  const closeButton = document.querySelector('.close');
  closeButton.onclick = function() {
    modal.style.display = 'none';
  };

  // Close the modal when the user clicks outside the modal
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

// Function to add a new material entry
function addMaterial(materialData) {
  db.collection('materials')
    .add(materialData)
    .then(docRef => {
      console.log('Material added successfully with ID: ', docRef.id);
      const successMessage = `Material added successfully with ID: ${docRef.id}`;
      showSuccessModal(successMessage);
      resetForm(); // Reset the form after successful addition
    })
    .catch(error => {
      console.error('Error adding material:', error);
      alert('Failed to add material. Please try again.');
    });
}

// Event listener for adding a material
document.getElementById('submit').addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  const materialName = document.getElementById('materialName').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const note = document.getElementById('note').value.trim();
  const entryName = document.getElementById('entryName').value.trim();
  const entryDate = document.getElementById('entryDate').value.trim();

  if (materialName && quantity && entryName && entryDate) {
    addMaterial({
      name: materialName,
      quantity: parseInt(quantity), // Convert quantity to a number
      note: note || '', // Use empty string if note is not provided
      entryName: entryName,
      entryDate: entryDate
    });
  } else {
    console.error('Please fill in all required fields');
    alert('Please fill in all required fields');
  }
});

// Function to reset the form
function resetForm() {
  document.getElementById('materialName').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('note').value = '';
  document.getElementById('entryName').value = '';
  document.getElementById('entryDate').value = '';
}


// Function to search for materials
function searchMaterials(searchText) {
  db.collection('materials')
    .where('name', '>=', searchText.toLowerCase())
    .get()
    .then(querySnapshot => {
      const materials = [];
      querySnapshot.forEach(doc => {
        materials.push(doc.data());
      });
      displayMaterials(materials);
    })
    .catch(error => {
      console.error('Error searching for materials:', error);
      alert('Failed to search for materials. Please try again.');
    });
}

// Function to fetch and display materials from Firestore
function displayMaterials() {
  const materialTable = document.getElementById('materialTable');
  materialTable.innerHTML = ''; // Clear previous data

  db.collection('materials')
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        materialTable.innerHTML = '<p>No materials found</p>';
      } else {
        let tableHTML = '<table>';
        tableHTML += '<tr><th>#</th><th>Name</th><th>Quantity</th><th>Note</th><th>Name of Entry</th><th>Date of Entry</th></tr>';

        let rowNumber = 1;

        querySnapshot.forEach(doc => {
          const material = doc.data();
          tableHTML += `<tr>
                          <td>${rowNumber}</td>
                          <td>${material.name}</td>
                          <td>${material.quantity}</td>
                          <td>${material.note || '-'}</td>
                          <td>${material.entryName}</td>
                          <td>${material.entryDate}</td>
                        </tr>`;
          rowNumber++;
        });

        tableHTML += '</table>';
        materialTable.innerHTML = tableHTML;
      }
    })
    .catch(error => {
      console.error('Error fetching materials:', error);
      materialTable.innerHTML = '<p>Failed to fetch materials. Please try again.</p>';
    });
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  displayMaterials(); // Display materials on page load
});
// Event listener for searching materials
document.getElementById('searchButton').addEventListener('click', function () {
  const searchText = document.getElementById('searchInput').value.trim().toLowerCase();

  if (searchText) {
    searchMaterials(searchText);
  } else {
    console.error('Please enter a search query');
    alert('Please enter a search query');
  }
});