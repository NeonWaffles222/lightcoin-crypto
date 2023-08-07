class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() { return true; }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);

  }

}

class Account {

  constructor(username) {
    this.username = username;

    this.transactions = [];
  }

  get balance() {
    let total = 0;
    for (let val of this.transactions) {
      total += val.value;
    }
    return total;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t1 = new Deposit(120.00, myAccount);
t1.commit();


console.log('Ending Balance:', myAccount.balance);
