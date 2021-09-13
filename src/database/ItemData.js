const mongoose = require ("mongoose");
const ItemSchema= require ("../models/Item");

const Item = mongoose.model ("Item", ItemSchema);

class ItemData {
    getItem () {
        return Item;
    }
}

module.exports = ItemData;