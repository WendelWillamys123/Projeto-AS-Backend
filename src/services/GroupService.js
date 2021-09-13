const GroupData = require ("../database/GroupData");
const ItemData = require ("../database/ItemData");

const GroupData = new GroupData();
const ItemData = new ItemData();

const Group = GroupData.getGroup();
const Item = ItemData.getItem();

const {addToMonitorsByGroup, removeFromMonitorsByGroup} = require ("../managers/monitorManager");

class GroupService {

    async list (owner) { 
        
        const groups = await Group.find({owner}).lean();
        return groups;
    }
    
    async idindex (_id){

        const group = await Group.findById(_id).lean();
        return group;
    }

    async store (name, lastParent, roles, usedTimes, owner) {

        const group = await Group.findOne({email});
        const parent = await Group.findById(lastParent).lean ();
        var parents = parent.parents.concat (lastParent);
        const newGroup = await Group.create ({name, parents, roles, usedTimes, owner});

        return newGroup;
    }

    async idupdate (_id, name, roles, usedTimes, owner) {
 
        await removeFromMonitorsByGroup (_id);
        var newGroup = await Group.findByIdAndUpdate (_id, {name, roles, usedTimes, owner}, {new: true});
        await addToMonitorsByGroup (_id);
        
        return newGroup;
    }

    async idupdatemove (_id, destination_id) {
        
        var group = await Group.findById (_id).lean ();
        var destination = await Group.findById (destination_id).lean ();
        
        if (destination.parents.includes (_id) || destination_id === _id || group.parents[group.parents.length-1] === destination_id){
            return null;
        } 
          else {

            var newParents = destination.parents.concat (destination._id);

            await removeFromMonitorsByGroup (_id);
            var newGroup = await Group.findByIdAndUpdate (_id, {parents: newParents}, {new: true});

            await Item.updateMany ({parents: _id}, {$pullAll: {parents: group.parents}}).lean ();
            await Item.updateMany ({parents: _id}, {$push: {parents: {$each: newParents, $position: 0}}}).lean ();
            await addToMonitorsByGroup (_id);

            return newGroup;
        }
    }

    async iddestroy (_id) {
        
        await removeFromMonitorsByGroup (_id);
        
        const group = await Group.findByIdAndDelete (_id);
        await Item.deleteMany ({parents: _id});
        return group;
    }
};

module.exports = GroupService;