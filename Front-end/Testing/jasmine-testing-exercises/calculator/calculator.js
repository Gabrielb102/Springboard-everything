window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let amount = document.getElementById("loan-amount");
  let years = document.getElementById("loan-years");
  let rate = document.getElementById("loan-rate");
  amount.value = 10000;
  years.value = 5;
  rate.value = 5;
  const defaultVals = getCurrentUIValues();
  const defaultMonthlyPayment = calculateMonthlyPayment(defaultVals);
  return defaultMonthlyPayment;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const loanValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(loanValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const interest = (values.rate / 1200);
  let monthlyPayment = values.amount * interest;
  monthlyPayment /= (1-(1 + interest)**(values.years * -12));
  monthlyPayment *= 100;
  monthlyPayment = Math.floor(monthlyPayment);
  monthlyPayment /= 100;
  return monthlyPayment.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPaymentField = document.getElementById("monthly-payment");
  monthlyPaymentField.innerText = "$" + monthly;
}
