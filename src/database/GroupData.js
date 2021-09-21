const mongoose = require ("mongoose");
var GroupSchema = require ("../models/Group");
const ItemData = require ("./ItemData");

const itemData = new ItemData();
const Item = itemData.getItem();

GroupSchema = Item.discriminator ("Group", GroupSchema);

class GroupData {
    getGroup () {
        return GroupSchema;
    }
}

module.exports = GroupData;