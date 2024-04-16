// script.js

// Get references to the form and result elements
const payslipForm = document.getElementById('payslipForm');
const resultSection = document.getElementById('resultSection');

// Add event listener for form submission
payslipForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission behavior
  console.log("Submit button clicked"); 

  // Get values from input fields
  const employeeName = document.getElementById('employeeName').value;
  const hoursWorked = parseInt(document.getElementById('hoursWorked').value);
  const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
  const taxRatePercentage = parseFloat(document.getElementById('taxRate').value);

  // Calculate pay based on hours worked and hourly rate
  let totalPayBeforeTax = hoursWorked * hourlyRate;
  
 let taxAmount =(totalPayBeforeTax * (taxRatePercentage /100));

 
 let totalPayAfterTax =(totalPayBeforeTax - taxAmount);


const payslipForm=`
<h2>Payslip For ${employeeName}</h2>
<p> Hours Worked : ${hoursWorked}</p>
<p> Hourly Rate : $${hourlyRate.toFixed(2)}</p>;
<p>Total Pay Before Tax : $${totalPayBeforeTax.toFixed(2)}</p>;
<p>Tax Amount (${taxRatePercentage}%): $${taxAmount.toFixed(2)}</p>;
<p>Total Pay After Tax : $${totalPayAfterTax.toFixed(2)}</p>;

`;
resultSection.innerHTML=payslipForm;

});
