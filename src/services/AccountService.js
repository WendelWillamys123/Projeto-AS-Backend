const AccountData = require ("../database/AccountData");
const UserData = require ("../database/UserData");
const GroupData = require ("../database/GroupData");
const LockData = require ("../database/LockData");
const RoleData = require ("../database/RoleData");
const TimeData = require ("../database/TimeData");
const LogData = require ("../database/LogData");

const AccountData = new AccountData();
const UserData = new UserData();
const GroupData = new GroupData();
const LockData = new LockData();
const RoleData = new RoleData();
const TimeData = new TimeData();
const LogData = new LogData();

const Account = AccountData.getAccount();
const User = UserData.getUser();
const Group = GroupData.getGroup();
const Lock = LockData.getLock();
const Role = RoleData.getRole();
const Time = TimeData.getTime();
const Log = LogData.getLog();

const {addToMonitorsByAccount, removeFromMonitorsByAccount} = require ("../managers/monitorManager");

class AccountService {

    async list () { 
        
        const accounts = await Account.find().lean();
        return accounts;
    }
    
    async idindex (_id){

        const account = await Account.findById(_id).lean();
        return account;
    }

    async loginindex (email, password) {

        const account = await Account.findOne({email, password}).lean();
        return account;
    }

    async store (name, email, password) {

        const account = await Account.findOne({email});
        var newAccount = null;
        
        if (account === null) {

            newAccount = await Account.create({name, email, password});
            await Group.create ({name: "Root", parents: [], roles: [], usedTimes: [], owner: newAccount._id});
            addToMonitorsByAccount (newAccount._id)
        }

        return newAccount;
    }

    async idupdate (_id, name, email, password) {
 
        const account = await Account.findOne ({email});
        var newAccount = null;
        
        if (account === null || account._id == _id) {
            newAccount = await Account.findByIdAndUpdate(_id, {name, email, password}, {new: true}).lean();
        }
        return newAccount;
    }

    async iddestroy (_id) {
        
        removeFromMonitorsByAccount (_id);
        const account = await Account.findByIdAndDelete (_id);
        
        await User.deleteMany ({owner: _id});
        await Group.deleteMany ({owner: _id});
        await Lock.deleteMany ({owner: _id});
        await Role.deleteMany ({owner: _id});
        await Time.deleteMany ({owner: _id});
        await Log.deleteMany ({owner: _id});

        return account;
    }
};

module.exports = AccountService;