#!/usr/bin/env node
const readline = require('readline');

// Simulate persistent storage in-memory
let storageBalance = 1000.00;

function readBalance() {
  return storageBalance;
}

function writeBalance(newBalance) {
  storageBalance = newBalance;
}

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
  console.log('Enter your choice (1-4): ');
}

function promptInput(promptText) {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      resolve(input);
    });
  });
}

async function main() {
  let continueFlag = true;
  while (continueFlag) {
    displayMenu();
    const choice = await promptInput('');
    switch (choice.trim()) {
      case '1':
        // View Balance
        console.log(`Current balance: ${readBalance().toFixed(2).padStart(9, '0')}`);
        break;
      case '2':
        // Credit Account
        const creditInput = await promptInput('Enter credit amount: ');
        const creditAmount = parseFloat(creditInput);
        if (!isNaN(creditAmount) && creditAmount >= 0) {
          const newBalance = readBalance() + creditAmount;
          writeBalance(newBalance);
          console.log(`Amount credited. New balance: ${newBalance.toFixed(2).padStart(9, '0')}`);
        } else {
          console.log('Invalid credit amount.');
        }
        break;
      case '3':
        // Debit Account
        const debitInput = await promptInput('Enter debit amount: ');
        const debitAmount = parseFloat(debitInput);
        if (!isNaN(debitAmount) && debitAmount >= 0) {
          const currentBalance = readBalance();
          if (currentBalance >= debitAmount) {
            const newBalance = currentBalance - debitAmount;
            writeBalance(newBalance);
            console.log(`Amount debited. New balance: ${newBalance.toFixed(2).padStart(9, '0')}`);
          } else {
            console.log('Insufficient funds for this debit.');
          }
        } else {
          console.log('Invalid debit amount.');
        }
        break;
      case '4':
        continueFlag = false;
        console.log('Exiting the program. Goodbye!');
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
  rl.close();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

main();
