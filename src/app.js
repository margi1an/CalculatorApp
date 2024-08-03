
let billInput = document.querySelector('.input input[type="text"]');
let peopleInput = document.querySelector('.people .input input[type="text"]');
let tipButtons = document.querySelectorAll('.buttons button');
let customTipButton = document.querySelector('.custom');
let customTipInput = document.createElement('input');
customTipInput.type = 'text';
customTipInput.placeholder = 'Custom %';
customTipInput.classList.add('custom-tip');
document.querySelector('.buttons').appendChild(customTipInput);
let tipAmountDisplay = document.querySelector('.amountPrice h1');
let totalDisplay = document.querySelector('.total .amountPrice h1');
let resetButton = document.querySelector('.button button');
let billValue = 0;
let numberOfPeople = 1;
let tipPercentage = 0;
function calculateTipAndTotal() {
    if (numberOfPeople === 0) {
        tipAmountDisplay.textContent = '$0.00';
        totalDisplay.textContent = '$0.00';
        return;
    }
    let tipAmount = (billValue * tipPercentage) / 100;
    let totalAmount = billValue + tipAmount;
    let tipPerPerson = tipAmount / numberOfPeople;
    let totalPerPerson = totalAmount / numberOfPeople;
    tipAmountDisplay.textContent = "$".concat(tipPerPerson.toFixed(2));
    totalDisplay.textContent = "$".concat(totalPerPerson.toFixed(2));
}
billInput.addEventListener('input', function (event) {
    billValue = parseFloat(event.target.value) || 0;
    calculateTipAndTotal();
});
peopleInput.addEventListener('input', function (event) {
    numberOfPeople = parseInt(event.target.value) || 1;
    calculateTipAndTotal();
});
tipButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        tipButtons.forEach(function (btn) { return btn.classList.remove('active'); });
        tipPercentage = parseInt(button.textContent.replace('%', '').trim()) || 0;
        calculateTipAndTotal();
        button.classList.add('active');
        if (button !== customTipButton) {
            customTipInput.style.display = 'none';
        }
    });
});
customTipInput.addEventListener('input', function () {
    tipPercentage = parseFloat(customTipInput.value) || 0;
    calculateTipAndTotal();
});
customTipButton.addEventListener('click', function () {
    customTipInput.style.display = 'inline-block';
    customTipInput.focus();
});
resetButton.addEventListener('click', function () {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalDisplay.textContent = '$0.00';
    tipPercentage = 0;
    billValue = 0;
    numberOfPeople = 1;
    tipButtons.forEach(function (button) { return button.classList.remove('active'); });
    customTipInput.style.display = 'none';
});
