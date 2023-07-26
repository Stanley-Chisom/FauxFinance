// Utility functions
function calculateBalance(movements) {
  return movements.reduce((acc, currVal) => acc + currVal, 0);
}

function calculateCashIn(movements) {
  return movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
}

function calculateCashOut(movements) {
  return movements
    .filter((movement) => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
}

function calculateInterest(movements) {
  return movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .reduce((acc, interest) => acc + interest, 0);
}

// Function to display movements
function displayMovements(movements) {
  elements.containerMovements.innerHTML = ""; // Clear the container before displaying

  movements.forEach((movement, i) => {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${movement}</div>
      </div>
    `;

    elements.containerMovements.insertAdjacentHTML("beforeend", html);
  });
}

// Function to set balance
function setBalance(balance) {
  elements.labelBalance.textContent = `${balance} EUR`;
}

// Function to set summary values
function setSummary(cashIn, cashOut, interest) {
  elements.labelSumIn.textContent = `${cashIn}€`;
  elements.labelSumOut.textContent = `${Math.abs(cashOut)}€`;
  elements.labelSumInterest.textContent = `${interest}`;
}

// Assuming the following accounts and movements exist
const account1 = {
  owner: "Stanley Chisom",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

// Grouping elements by category using the functions
const elements = {
  labelWelcome: getElement(".welcome"),
  labelDate: getElement(".date"),
  labelBalance: getElement(".balance__value"),
  labelSumIn: getElement(".summary__value--in"),
  labelSumOut: getElement(".summary__value--out"),
  labelSumInterest: getElement(".summary__value--interest"),
  labelTimer: getElement(".timer"),
  containerApp: getElement(".app"),
  containerMovements: getElement(".movements"),
  btnLogin: getElement(".login__btn"),
  btnTransfer: getElement(".form__btn--transfer"),
  btnLoan: getElement(".form__btn--loan"),
  btnClose: getElement(".form__btn--close"),
  btnSort: getElement(".btn--sort"),
  inputLoginUsername: getElement(".login__input--user"),
  inputLoginPin: getElement(".login__input--pin"),
  inputTransferTo: getElement(".form__input--to"),
  inputTransferAmount: getElement(".form__input--amount"),
  inputLoanAmount: getElement(".form__input--loan-amount"),
  inputCloseUsername: getElement(".form__input--user"),
  inputClosePin: getElement(".form__input--pin"),
};

// Function to query a single element
function getElement(selector) {
  return document.querySelector(selector);
}

// Function to query multiple elements matching a selector
function getElements(selector) {
  return document.querySelectorAll(selector);
}

// Calculate and display the balance and summary
const { movements } = account1;
const balance = calculateBalance(movements);
setBalance(balance);

const cashIn = calculateCashIn(movements);
const cashOut = calculateCashOut(movements);
const interest = calculateInterest(movements);
setSummary(cashIn, cashOut, interest);

// Display movements
displayMovements(movements);

