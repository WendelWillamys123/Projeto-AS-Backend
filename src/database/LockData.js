const mongoose = require ("mongoose");
var LockSchema= require ("../models/Lock");
const ItemData = require ("./ItemData");

const itemData = new ItemData();
const Item = itemData.getItem();

LockSchema = Item.discriminator ("Lock", LockSchema);

class LockData {
    getLock () {
        return LockSchema;
    }
}

module.exports = LockData;