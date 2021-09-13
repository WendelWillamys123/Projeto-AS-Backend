const mongoose = require ("mongoose");
const TimeSchema= require ("../models/Time");

const Time = mongoose.model ("Time", TimeSchema);

class TimeData {
    getTime () {
        return Time;
    }
}

module.exports = TimeData;