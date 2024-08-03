
const billInput = document.querySelector<HTMLInputElement>('.input input[type="text"]')!;
const peopleInput = document.querySelector<HTMLInputElement>('.people .input input[type="text"]')!;
const tipButtons = document.querySelectorAll<HTMLButtonElement>('.buttons button');
const customTipButton = document.querySelector<HTMLButtonElement>('.custom')!;
const customTipInput = document.createElement('input');
customTipInput.type = 'text';
customTipInput.placeholder = 'Custom %';
customTipInput.classList.add('custom-tip');
document.querySelector('.buttons')!.appendChild(customTipInput);
const tipAmountDisplay = document.querySelector<HTMLElement>('.amountPrice h1')!;
const totalDisplay = document.querySelector<HTMLElement>('.total .amountPrice h1')!;
const resetButton = document.querySelector<HTMLButtonElement>('.button button')!;

let billValue = 0;
let numberOfPeople = 1;
let tipPercentage = 0;

function calculateTipAndTotal() {
  if (numberOfPeople === 0) {
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    return;
  }

  const tipAmount = (billValue * tipPercentage) / 100;
  const totalAmount = billValue + tipAmount;

  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;

  // Update the display
  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Event listeners for inputs
billInput.addEventListener('input', (event) => {
  billValue = parseFloat((event.target as HTMLInputElement).value) || 0;
  calculateTipAndTotal();
});

peopleInput.addEventListener('input', (event) => {
  numberOfPeople = parseInt((event.target as HTMLInputElement).value) || 1;
  calculateTipAndTotal();
});

// Event listeners for tip buttons
tipButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove('active'));

    // Set the tip percentage based on button text
    tipPercentage = parseInt(button.textContent!.replace('%', '').trim()) || 0;
    calculateTipAndTotal();

    // Add active class to the selected button
    button.classList.add('active');

    // Hide custom tip input if not selected
    if (button !== customTipButton) {
      customTipInput.style.display = 'none';
    }
  });
});

// Event listener for custom tip input
customTipInput.addEventListener('input', () => {
  tipPercentage = parseFloat(customTipInput.value) || 0;
  calculateTipAndTotal();
});

// Event listener for custom tip button
customTipButton.addEventListener('click', () => {
  // Show the custom tip input
  customTipInput.style.display = 'inline-block';
  customTipInput.focus();
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.textContent = '$0.00';
  totalDisplay.textContent = '$0.00';
  tipPercentage = 0;
  billValue = 0;
  numberOfPeople = 1;

  // Remove active class from all buttons
  tipButtons.forEach((button) => button.classList.remove('active'));
  customTipInput.style.display = 'none';
});
