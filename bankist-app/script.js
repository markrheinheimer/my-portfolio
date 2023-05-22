'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // added an additional sort paramater, and if sort is set to true then we can create a copy of the original array with the slice method and then sort it in ascending order, and if false then we just pass through the original movements that were passed into the function
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
       <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//because we are pointing to the same object in the HEAP, we can set properties on that object by using references like acc.balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function () {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting, (the buttons default is to reload the page after clicking)
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // this will return undefined for improper login, because the optional chaining question mark checks if the currentAccount is an actual account before it checks if a pin exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear the input fields---because the assignment operator works right to left one can assign both values like this
    inputLoginUsername.value = inputLoginPin.value = '';
    // loses focus on the button so the cursor is no longer flashing in the pin button
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
  // Update UI
  updateUI(currentAccount);
});
// Hitting "enter" is the same as a click event on the btnLogin button

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//Methods are functions that we call on objects

// let arr = ['a', 'b', 'c', 'd', 'e'];
// slice does not mutate an array
// console.log(arr.slice(2)); //returns new array with copied part, returns 2 on
// console.log(arr.slice(2, 4)); //returns 2 and 3

// console.log(arr.slice(-2)); //returns last 2 elements of an array
// console.log(arr.slice(1, -2)); //returns b and c

// console.log(arr.slice()); // returns a copy of an entire array
// console.log(...arr); // also returns a copy of an entire array

// Splice ---mutates the array. normally used to remove elements from an array, not caring about the return
// console.log(arr.splice(2));
//console.log(arr);
//console.log(arr.splice(-1)); // removes last element
//console.log(arr.splice(1, 2)); // returns position 1 and 2, 2nd argument is for how many positions to remove
//console.log(arr);

// Reverse ---mutates the original array and returns it

// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // Concat

// const letters = arr.concat(arr2); //does not mutate
// console.log(letters);
// console.log(...arr, ...arr2); //does the same, and also does not mutate

// // Join

// console.log(letters.join(' - ')); // returns a string

// // AT method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr[arr.length - 1]); // to get the last element
// console.log(arr.slice(-1)[0]); // copies the last element and pulls it out of the array to get the value, same result as above
// console.log(arr.at(-1)); //now easier way to get the last value

// console.log('jonas'.at(0)); //returns j
// console.log('jonas'.at(-1)); //returns s

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---For Each---');
// // .forEach method requires a callback function because it is a higher order function in order to tell it what to do/
// // .forEach loops over the array and in each iteration it calls the fucntion on it, it passes in the current element of the array into the argument(can call the argument anything you want, but in this case we use movement)
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// //When needing a counter  ----  entries method has the index argument first and then the array value

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// //When needing a counter---
// //for each can also have the index and entire array passed as arguments if needed
// // For each has the array value first, then the index value, then the entire array if needed

// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// // Differneces between the for-of loop and forEach: You can not break out of a for-each loop

// //  Maps -- forEach
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set -- forEach, sets don't have keys so it is just a duplicate of the value
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

//////////////////////////////////////////////////////
// Coding Challenge #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀

// -*
// const accounts = [account1, account2, account3, account4];

// Only returns the first element in the array that is true
// const firstWithdrawal = movements.find(mov => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
//const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//  For-0f version of the find method

// const findOwner = function (acc) {
//   for (const accx of acc) {
//     if (accx.owner === 'Jessica Davis') return accx;
//   }
// };
// console.log(findOwner(accounts));

//

// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); // Mutates the array, sorts alphabetically
// console.log(owners);

// // Numbers
// console.log(movements);
// console.log(movements.sort()); // does not work as expected for numbers, because it converts everything into strings for sorting purposes

// // return > 0 then B, A (switch order)
// // return < 0, then A, B (keep order)
// // ascending order
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });
// // console.log(movements);
// movements.sort((a, b) => a - b); //simplified version because if b is greater than a then it will always return a negative number
// console.log(movements);

// // descending order
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
// console.log(movements);
// // or
// movements.sort((a, b) => b - a);

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty arrays + fill method
// const x = new Array(7); //creates an empty array of 7 slots
// console.log(x);

// // console.log(x.map(() => 5)); // does not work to fill an array

// x.fill(1, 3, 5); // fills the array with 1, from position 3 to 5
// console.log(x);

// arr.fill(23, 4, 6); // mutates the original array and puts 23 into positions 4 and 5
// console.log(arr);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1); // creates a new array of length 7, filled with 1's
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1); // creates a new array of length 7, going from 1 to 7, we use and underscore as a placeholder because we only need access to the i component of the .from method
// console.log(z);

// const rand = Array.from({ length: 100 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );
// console.log(rand); // 100 random dice rolls

// Grabs all the movements in the current user when you click the current balance amount and then places them into an array,
// this creates array from a node list that is not exactly an array, but is an array like list
// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// // another way to do it without the second argument as a mapping method
// const movementsUI2 = [...document.querySelectorAll('.movements__value')];

// // Array Methods Practice
// // 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);
// // 2.
// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// let a = 10;
// //console.log(a++); //when you do this it increments a but still returns the old value, so in this case it returns 10\
// console.log(++a);
// console.log(a);
// // 3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// // { deposits: 0, withdrawals: 0 } this is the accumulator for the reduce function
// console.log(deposits, withdrawals);

// // 4.
// // this is a nice title => This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   return capitalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// GOOD LUCK 😀
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const eatingAmount = function (dog) {
  if (dog.curFood < dog.recFood * 0.9) console.log('Dog is eating too little');
  if (dog.curFood > dog.recFood * 1.1) console.log('Dog is eating too much');
  else console.log('Dog is eating just right');
};

const sarahDog = function () {
  const [dog] = dogs.filter(dog => dog.owners.flat().includes('Sarah'));
  eatingAmount(dog);
};

sarahDog();

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

console.log(dogs);

const ownersEatTooLittle = [].flat();
const ownersEatTooMuch = [].flat();
const eatTooMuch = dogs.map(dog => {
  if (dog.curFood > dog.recFood) {
    ownersEatTooMuch.push(dog.owners);
  } else if (dog.curFood < dog.recFood) {
    ownersEatTooLittle.push(dog.owners);
  }
});

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const flatownersEatTooLittle = ownersEatTooLittle.flat();
const flatownersEatTooMuch = ownersEatTooMuch.flat();
console.log(flatownersEatTooLittle);
console.log(flatownersEatTooMuch);
// console.log(`${ownersEatTooMuch.forEach(dog => cl)} dogs eat too much!`);

console.log(
  `${flatownersEatTooLittle[0]} ${flatownersEatTooLittle[1]} and ${flatownersEatTooLittle[2]}'s dogs eat too little!`
);
console.log(
  `${flatownersEatTooMuch[0]} ${flatownersEatTooMuch[1]} and ${flatownersEatTooMuch[2]}'s dogs eat too Much!`
);
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recFood));
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const okayDog = dogs.filter(checkEatingOkay);
console.log(okayDog);
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
