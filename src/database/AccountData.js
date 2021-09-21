const mongoose = require ("mongoose");
const AccountSchema = require ("../models/Account");

const Account = mongoose.model ("Account", AccountSchema);

class AccountData {
    getAccount () {
        return Account;
    }
}

module.exports = AccountData;