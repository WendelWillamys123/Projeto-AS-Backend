const mongoose = require ("mongoose");
const GroupSchema= require ("../models/Group");

const Group = mongoose.model ("Group", GroupSchema);

class GroupData {
    getGroup () {
        return Group;
    }
}

module.exports = GroupData;