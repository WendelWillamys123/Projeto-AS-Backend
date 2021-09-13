const { Router } = require("express");
const TimeService = require("../services/TimeService");

const timeService = new TimeService();

const timeRoutes = Router(); 

    timeRoutes.get("/timelist", async (request, response) => {
        const {owner} = request.query;
        const times = await timeService.list();
        response.json (times);
    });

    timeRoutes.get("/timeidindex", async (request, response) => {
        const {_id} = request.query;
        const time = await timeService.idindex();
        response.json (time);
    });

    timeRoutes.get("/timestore", async (request, response) => {
        const {start, end, days, use, trackAccess, trackMiss, owner} = request.body;
        var newTime = await timeService.store();
        response.json (newTime);
    });

    timeRoutes.get("/timeidupdate", async (request, response) => {
        const {_id} = request.query;
        const {start, end, days, use, trackAccess, trackMiss, owner} = request.body;
        var newTime = await timeService.idupdate();
        response.json (newTime);
    });

    timeRoutes.get("/timeiddestroy", async (request, response) => {
        const {_id} = request.query;
        const time = await timeService.iddestroy();
        response.json (time);
    });

module.exports = timeRoutes;