const LogData = require ("../database/LogData");

const LogData = new LogData();
const Log = LogData.getLog();

class LogService {

    async list (owner) {
        const logs = await Log.find ({owner}).lean();
        return logs;
    }

    async listpag (page, user, item, role, start, end, owner) {
    
        if (user === "") var userValue = {$exists: true};
        else var userValue = {"$regex": user, "$options": "i"};
        
        if (item === "") var itemValue = {$exists: true};
        else var itemValue = {"$regex": item, "$options": "i"};
        
        if (role === "") var roleValue = {$exists: true};
        else var roleValue = {"$regex": role, "$options": "i"};
        
        if (start === "") var startValue = {$exists: true};
        else var startValue = {$gte: new Date (start+":00.000Z")};
    
        if (end === "") var endValue = {$exists: true}; 
        else var endValue = {$lte: new Date (end+":00.000Z")};

        const logs = await Log.paginate ({
                user: userValue,
                path: itemValue,
                role: roleValue,
                creationDate: {...startValue, ...endValue},
                owner
            }, {
                page,
                limit: 20,
                sort: "-creationDate",
                lean: true
            });

        return logs;
    }
    
    async idindex (_id) {
        const log = await Log.findById (_id).lean ();
        return log;
    }

    async store (user, lock, path, role, type, creationDate, owner) {
        var newLog = await Log.create ({user, lock, path, role, type, creationDate, owner});
        return newLog;
    }

    async idupdate (_id, user, lock, path, role, type, creationDate, owner) {
        var newLog = await Log.findByIdAndUpdate (_id, {user, lock, path, role, type, creationDate, owner}, {new: true});
        return newLog;
    }

    async iddestroy (_id) {
        const log = await Log.findByIdAndDelete (_id);
        return log;
    }
};

module.exports = LogService;