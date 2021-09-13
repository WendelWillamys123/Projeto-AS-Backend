const { Router } = require("express");
const LogService = require("../services/LogService");

const logService = new LogService();

const logRoutes = Router(); 

    logRoutes.get("/loglist", async (request, response) => {
        const {owner} = request.query;
        const logs = await logService.list(owner);
        response.json (logs);
    });

    logRoutes.get("/loglistpag", async (request, response) => {
        var {page, user, item, role, start, end, owner} = request.query;
        const logs = await logService.listpag(page, user, item, role, start, end, owner);
        response.json (logs);
    });

    logRoutes.get("/logidindex", async (request, response) => {
        const {_id} = request.query;
        const log = await logService.idindex(_id);
        response.json (log);
    });

    logRoutes.post("/logstore", async (request, response) => {
        const {user, lock, path, role, type, creationDate, owner} = request.body;
        var newLog = await logService.store(user, lock, path, role, type, creationDate, owner);
        response.json (newLog);
    });

    logRoutes.put("/logidupdate", async (request, response) => {
        const {_id} = request.query;
        const {user, lock, path, role, type, creationDate, owner} = request.body;
        var newLog = await logService.idupdate(_id, user, lock, path, role, type, creationDate, owner);
        response.json (newLog);
    });

    logRoutes.delete("/logiddestroy", async (request, response) => {
        const {_id} = request.query;
        const log = await logService.iddestroy(_id);
        response.json (log);
    });

module.exports = logRoutes;
