const UserData = require ("../database/UserData");

const UserData = new UserData();
const User = UserData.getUser();

const {addToMonitorsByUser, removeFromMonitorsByUser} = require ("../managers/monitorManager");

class UserService {

    async list (owner) {
        const users = await User.find ({owner});
        return users;
    }

    async listpag (page, name, owner) {
        if (name === "") var nameValue = {$exists: true};
        else var nameValue = {"$regex": name, "$options": "i"};
        const users = await User.paginate ({name: nameValue, owner}, {page, limit: 20});
        return users;
    }
    
    async idindex (_id) {
        const user = await User.findById (_id).populate ({path: "roles", populate: {path: "times"}});
        return user;
    }

    async store (name, PINs, roles, usedTimes, owner) {
        var newUser = await User.create ({name, PINs, roles, usedTimes, owner});
        return newUser;
    }

    async idupdate (_id,name, PINs, roles, usedTimes, owner) {
        await removeFromMonitorsByUser (_id);
        var newUser = await User.findByIdAndUpdate (_id, {name, PINs, roles, usedTimes, owner}, {new: true});
        await addToMonitorsByUser (_id);
        return newUser;
    }

    async iddestroy (_id) {
        await removeFromMonitorsByUser (_id);
        const user = await User.findByIdAndDelete (_id);
        return user;
    }
};

module.exports = UserService;