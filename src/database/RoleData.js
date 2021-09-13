const mongoose = require ("mongoose");
const RoleSchema= require ("../models/Role");

const Role = mongoose.model ("Role", RoleSchema);

class RoleData {
    getRole () {
        return Role;
    }
}

module.exports = RoleData;