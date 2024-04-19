const database = firebase.database();
const ref = firebase.database().ref;

// Define a custom set function for storing data in Firebase
function customSet(refPath, data) {
  return new Promise((resolve, reject) => {
    ref(refPath).set(data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Your form submission logic using the custom set function
function submitForm() {
  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    otherName: document.getElementById("otherName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    country: document.getElementById("country").value,
    gender: document.getElementById("gender").value,
    staffId: document.getElementById("staffId").value,
    department: document.getElementById("department").value,
    designation: document.getElementById("designation").value,
    unit: document.getElementById("unit").value,
    paymentInfo: document.getElementById("paymentInfo").value,
    baseSalary: document.getElementById("baseSalary").value,
    gross: document.getElementById("gross").value,
    net: document.getElementById("net").value,
    allowance: document.getElementById("allowance").value,
    tax: document.getElementById("tax").value,
    pension: document.getElementById("pension").value,
    payPeriod: document.getElementById("payPeriod").value,
    entitlement: document.getElementById("entitlement").value
  };

  // Store data in Firebase using custom set function
  customSet('users/' + formData.staffId
, formData)
.then(() => {
alert('Data successfully stored in Firebase!');
document.getElementById("myForm").reset(); // Reset form after successful submission
showStep(1); // Show step 1 after submission
})
.catch((error) => {
console.error('Error storing data: ', error);
alert('Failed to store data. Please try again.');
});
}

// Event listener for form submission
document.getElementById("submit").addEventListener('click', function(e) {
e.preventDefault();
submitForm();
});

// Helper function to show form step
function showStep(step) {
document.querySelectorAll('.form-step').forEach((element) => {
element.style.display = 'none';
});
document.querySelector('#step' + step).style.display = 'block';
}

// Validate form fields for Step 1
function validateStep1() {
const requiredFields = [
"firstName", "lastName", "email", "phoneNumber", "address1",
"city", "state", "country", "gender", "staffId", "department",
"designation", "unit"
];

const isValidStep1 = requiredFields.every(field => {
const value = document.getElementById(field).value;
return value.trim() !== '';
});

if (isValidStep1) {
nextStep();
} else {
alert("Please fill in all the required fields in Step 1 before moving to the next step.");
}
}

// Navigate to the next step
function nextStep() {
const currentStep = 1;
const maxStep = 2;
if (currentStep < maxStep) {
showStep(currentStep + 1);
}
}