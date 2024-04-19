let currentStep = 1;
const maxStep = 2;

function showStep(step) {
    document.querySelectorAll('.form-step').forEach((element) => {
        element.style.display = 'none';
    });
    document.querySelector('#step' + step).style.display = 'block';
}


function validateStep1() {
    const employeeName = document.getElementById("employeeName").value;
    const employeeId = document.getElementById("employeeId").value;
    const department = document.getElementById("department").value;
    const gender = document.getElementById("gender").value;
  
    if (employeeName && employeeId && department && gender) {
      nextStep();
    } else {
      alert("Please fill in all the fields in Step 1 before moving to the next step.");
    }
  }
  
  function nextStep() {
    if (currentStep < maxStep) {
        currentStep++;
        showStep(currentStep);
    }

  }
  
  const form = document.querySelector('form');
  const submitButton = document.querySelector('input[type="submit"]');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Perform form validation and data processing here
    // ...
  
    // Display the alert message
    alert('Successful');
  
    // Reset the form to its initial state
    form.reset();
  
    // Hide the second page
    step2.style.display = 'none';
  
    // Show the first page
    step1.style.display = 'block';
  
    // Optionally, disable the submit button or change its appearance
    // submitButton.disabled = true;
    // submitButton.value = 'Submitted';
  });


  