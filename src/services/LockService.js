const GroupData = require ("../database/GroupData");
const LockData = require ("../database/LockData");
const ItemData = require ("../database/ItemData");

const GroupData = new GroupData();
const LockData = new LockData();
const ItemData = new ItemData();

const Group = GroupData.getGroup();
const Item = ItemData.getItem();
const Lock = LockData.getLock();

const {addToMonitorsByLock, removeFromMonitorsByLock} = require ("../managers/monitorManager");

class LockService {
    
    async list (owner) {
        const locks = await Lock.find ({owner});
        return locks;
    }
    
    async idindex (_id) {
        const lock = await Lock.findById (_id);
        return lock;
    }

    async store (name, lastParent, owner) {
        const parent = await Item.findById (lastParent).lean();
        var parents = parent.parents.concat (lastParent);
        
        const newLock = await Lock.create ({name, parents, owner});
        await addToMonitorsByLock (newLock._id);

        return newLock;
    }

    async idupdate (_id, name, owner) {
        var newLock = await Lock.findByIdAndUpdate (_id, {name, owner}, {new: true});
        return newLock;
    }

    async idupdatemove (_id, destination_id) {
        const lock = await Lock.findById (_id).lean ();
        var destination = await Group.findById (destination_id).lean ();
        
        if (lock.parents[lock.parents.length-1] === destination_id) return null;
        
        else {
            var newParents = destination.parents.concat (destination._id);
            await removeFromMonitorsByLock (_id);
            
            var newLock = await Lock.findByIdAndUpdate (_id, {parents: newParents}, {new: true});
            await addToMonitorsByLock (_id);
            
            return newLock;
        }
    }

    async iddestroy (_id) {
        await removeFromMonitorsByLock (_id);
        const lock = await Lock.findByIdAndDelete (_id);
        return lock;
    }
};

module.exports = LockService;