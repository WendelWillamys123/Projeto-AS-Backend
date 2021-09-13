const ItemData = require ("../database/ItemData");
const RoleData = require ("../database/RoleData");
const TimeData = require ("../database/TimeData");

const ItemData = new ItemData();
const RoleData = new RoleData();
const TimeData = new TimeData();

const Item = ItemData.getItem();
const Role = RoleData.getRole();
const Time = TimeData.getTime();

class ItemService {

    async list (owner) { 

        const {owner} = request.query;
        const items = await Item.find({owner}).lean();
        return items;
    }
    
    async listpag (page, name, owner){
       
        if (name === "") {
            var nameValue = { $exists: true }; 
        } else {
            var nameValue = {"$regex": name, "$options": "i"};
        }
        
        var items = await Item.paginate ({name: nameValue, owner, "parents.0": {$exists: true}}, {page, limit: 20, lean: true});
            
        for (var a = 0; a < items.docs.length; a++) {
            items.docs[a].parentInfos = [];
            const parents = await Item.find ({_id: items.docs[a].parents}).lean();
            parents.push (items.docs[a]);

            for (var b = 0; b < parents.length; b++) {
                items.docs[a].parentInfos.push ({_id: parents[b]._id, name: parents[b].name, type: parents[b].type});
            }
        }
        return items;
    }
    
    async idindex (_id){
       
        var item = await Item.findById (_id).lean();
        
        if (item.type === "Group") {
            for (var a = 0; a < item.roles.length; a++) {
                item.roles[a] = await Role.findById (item.roles[a]).lean();
                
                for (var b = 0; b < item.roles[a].times.length; b++) {
                    item.roles[a].times[b] = await Time.findById (item.roles[a].times[b]).lean();
                }
            }
        }

        return item;
    }

    async parentindex (parent, owner){
       
        if (parent.length === 0) {
            var items = await Item.find ({parents: {$size: 0}, owner}).lean ();
        } else {
            var items = await Item.find ({$expr: {$eq: [{"$arrayElemAt": ["$parents", -1]}, parent]}}).lean ();
        }

        return items;
    }

    async parentindexpag (page, parent){
        
        var items = await Item.paginate ({$expr: {$eq: [{"$arrayElemAt": ["$parents", -1]}, parent]}}, {page, limit: 20});
        var lastParent = await Item.findById (parent).lean();
        var parents = await Item.find ({_id: lastParent.parents}).lean();

        parents.push (lastParent);
        var parentInfos = [];
        
        for (var a = 0; a < parents.length; a++) {
            parentInfos.push ({_id: parents[a]._id, name: parents[a].name, type: parents[a].type});
        }
        
        return ({items, parentInfos});
    }

    async store (name, parents, owner){
        var newItem = await Item.create ({name, parents, owner});
        return newItem;
    }

    async idupdate (_id, name, parents, owner){
        var newItem = await Item.findByIdAndUpdate (_id, {name, parents, owner}, {new: true});
        return newItem;
    }

    async iddestroy (_id){
        const item = await Item.findByIdAndDelete(_id);
        return item;
    }
    
};

module.exports = ItemService;