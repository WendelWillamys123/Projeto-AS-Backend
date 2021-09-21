const TimeData = require ("../database/TimeData");

const timeData = new TimeData();
const Time = timeData.getTime();

class TimeService {

    async list (owner){
        const times = await Time.find ({owner});
        return times;
    }
    
    async idindex (_id){
        const time = await Time.findById (_id);
        return time;
    }

    async store (start, end, days, use, trackAccess, trackMiss, owner){
        var newTime = await Time.create ({start, end, days, use, trackAccess, trackMiss, owner});
        return newTime;
    }

    async idupdate (_id, start, end, days, use, trackAccess, trackMiss, owner){
        var newTime = await Time.findByIdAndUpdate (_id, {start, end, days, use, trackAccess, trackMiss, owner}, {new: true});
        return newTime;
    }

    async iddestroy (_id){
        const time = await Time.findByIdAndDelete (_id);
        return time;
    }
};

module.exports = TimeService;