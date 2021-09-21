const UserData = require ("../database/UserData");
const GroupData = require ("../database/GroupData");
const RoleData = require ("../database/RoleData");
const TimeData = require ("../database/TimeData");

const userData = new UserData();
const groupData = new GroupData();
const roleData = new RoleData();
const timeData = new TimeData();

const User = userData.getUser();
const Group = groupData.getGroup();
const Role = roleData.getRole();
const Time = timeData.getTime();

const {addToMonitorsByRole, removeFromMonitorsByRole} = require ("../managers/monitorManager");
const {addToSchedulesByRole, removeFromSchedulesByRole} = require ("../managers/scheduleManager");

class RoleService {

    async list (owner) {
        const roles = await Role.find ({owner}).populate ("times");
        return roles;
    }

    async listpag (page, name, owner) {
        if (name === "") var nameValue = {$exists: true};
        else var nameValue = {"$regex": name, "$options": "i"};

        const roles = await Role.paginate ({name: nameValue, owner}, {page, limit: 20});

        return roles;
    }
    
    async idindex (_id) {
        const role = await Role.findById (_id).populate ("times");
        return role;
    }

    async store (name, times, owner) {
        const newRole = await Role.create ({name, times, owner});
        return newRole;
    }

    async idupdate (_id, name, timeInfos, owner) {
        const role = await Role.findById (_id).populate("times").lean();
        
        var times = [];
        var deletedTimes = [];
        var addedUsedTimes = [];
        
        for (var a = 0; a < timeInfos.length; a++) {
            
            if (timeInfos[a]._id === null) {
                var newTime = await Time.create ({
                        start: timeInfos[a].start,
                        end: timeInfos[a].end,
                        days: timeInfos[a].days,
                        use: timeInfos[a].use,
                        trackAccess: timeInfos[a].trackAccess,
                        trackMiss: timeInfos[a].trackMiss,
                        owner
                    });

                if (newTime.use) {
                    addedUsedTimes.push (newTime._id);
                }

                times.push (newTime._id);

            } else {
                await Time.findByIdAndUpdate (timeInfos[a]._id, {
                        start: timeInfos[a].start,
                        end: timeInfos[a].end,
                        days: timeInfos[a].days,
                        use: timeInfos[a].use,
                        trackAccess: timeInfos[a].trackAccess,
                        trackMiss: timeInfos[a].trackMiss,
                        owner
                    });

                times.push (timeInfos[a]._id);
            }
        }

        for (var c = 0; c < role.times.length; c++) {
            var deletedTime = true;
            
            for (var d = 0; d < timeInfos.length; d++) {
                if (role.times[c]._id == timeInfos[d]._id) {
                    deletedTime = false;
                }
            }
            
            if (deletedTime) {
                deletedTimes.push (role.times[c]._id);
            }
        }

        await removeFromSchedulesByRole (_id);
        await removeFromMonitorsByRole (_id);

        const newRole = await Role.findByIdAndUpdate (_id, {name, times, owner}, {new: true}).populate ("times").lean ();

        await Time.deleteMany ({_id: {$in: deletedTimes}});
        await User.updateMany ({roles: _id}, {$pull: {usedTimes: {$in: deletedTimes}}});
        await User.updateMany ({roles: _id}, {$push: {usedTimes: {$each: addedUsedTimes}}});
        await Group.updateMany ({roles: _id}, {$pull: {usedTimes: {$in: deletedTimes}}});
        await Group.updateMany ({roles: _id}, {$push: {usedTimes: {$each: addedUsedTimes}}});

        await addToMonitorsByRole (_id);
        await addToSchedulesByRole (_id);

        return newRole;
    }

    async iddestroy (_id) {
        await removeFromSchedulesByRole (_id);
        await removeFromMonitorsByRole (_id);

        const role = await Role.findByIdAndDelete (_id);

        await Time.deleteMany ({_id: {$in: role.times}});
        await User.updateMany ({roles: _id}, {$pull: {roles: _id, usedTimes: {$in: role.times}}});
        await Group.updateMany ({roles: _id}, {$pull: {roles: _id, usedTimes: {$in: role.times}}});

        return role;
    }
};

module.exports = RoleService;