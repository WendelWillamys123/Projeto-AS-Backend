const mongoose = require ("mongoose");
const LogSchema= require ("../models/Log");

const Log = mongoose.model ("Log", LogSchema);

class LogData {
    getLog () {
        return Log;
    }
}

module.exports = LogData;