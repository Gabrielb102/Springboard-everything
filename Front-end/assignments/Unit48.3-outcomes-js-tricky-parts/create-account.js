function Account(pin, amount) {
    this.pin = pin;
    this.amount = amount;
}

Account.prototype.checkBalance = function(pin) {
    if (pin !== this.pin) {
        return "Invalid PIN.";
    } 
    return `$${this.amount}`;
}

Account.prototype.deposit = function(pin, dep) {
    if (pin !== this.pin) {
        return "Invalid PIN.";
    } 
    this.amount += dep;
    return `Succesfully deposited $${dep}. Current balance: $${this.amount}.`
}

Account.prototype.withdraw = function(pin, withd) {
    if (pin !== this.pin) {
        return "Invalid PIN.";
    } 
    if (withd > this.amount) {
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
    }
    this.amount -= withd;
    return `Succesfully withdrew $${withd}. Current balance: $${this.amount}.`
}

Account.prototype.changePin = function(pin, newPin) {
    if (pin !== this.pin) {
        return "Invalid PIN.";
    } 
    this.pin = newPin;
    return "PIN successfully changed!";
}


function createAccount(pin, amount = 0) {
    const newAccount = new Account(pin, amount);
    console.log(newAccount);
    return newAccount;
}



module.exports = { createAccount };
