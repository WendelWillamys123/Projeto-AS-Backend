const mongoose = require ("mongoose");
const LockSchema= require ("../models/Lock");

const Lock = mongoose.model ("Lock", LockSchema);

class LockData {
    getLock () {
        return Lock;
    }
}

module.exports = LockData;