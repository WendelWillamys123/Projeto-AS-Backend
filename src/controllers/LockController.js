const { Router } = require("express");
const LockService = require("../services/LockService");

const lockService = new LockService();

const lockRoutes = Router();

    lockRoutes.get("/locklist", async (request, response) => {
        const {owner} = request.query;
        const locks = await lockService.list(owner);
        response.json (locks);
    });

    lockRoutes.get("/lockidindex", async (request, response) => {
        const {_id} = request.query;
        const lock = await lockService.idindex(_id);
        response.json (lock);
    });

    lockRoutes.post("/lockstore", async (request, response) => {
        const {name, lastParent, owner} = request.body;
        const newLock = await lockService.store(name, lastParent, owner);
        response.json (newLock);
    });

    lockRoutes.put("/lockidupdate", async (request, response) => {
        const {_id} = request.query;
        const {name, owner} = request.body;
        var newLock = await lockService.idupdate(_id, name, owner);
        response.json (newLock);
    });

    lockRoutes.put("/lockidupdatemove", async (request, response) => {
        const {_id, destination_id} = request.query;
        var newLock = await lockService.idupdatemove(_id, destination_id); 
        response.json (newLock);
    });

    lockRoutes.delete("/lockiddestroy", async (request, response) => {
        const {_id} = request.query;
        const lock = await lockService.iddestroy(_id);
        response.json (lock);
    });

module.exports = lockRoutes;