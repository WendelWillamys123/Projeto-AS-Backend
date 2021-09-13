const { Router } = require("express");
const ItemService = require("../services/ItemService");

const itemService = new ItemService();
const itemRoutes = Router();

    itemRoutes.get("/itemlist", async (request, response) => {
        const {owner} = request.query;
        const items = await itemService.list(owner);
        response.json (items);
    });

    itemRoutes.get("/itemlistpag", async (request, response) => {
        var {page, name, owner} = request.query;
        const items = await itemService.listpag(page, name, owner);
        response.json (items);
    });

    itemRoutes.get("/itemidindex", async (request, response) => {
        const {_id} = request.query;
        var item = await itemService.idindex(_id);
        response.json (item);
    });

    itemRoutes.get("/itemparentindex", async (request, response) => {
        const {parent, owner} = request.query;
        var items = await itemService.parentindex(parent, owner);
        response.json (items);
    });

    itemRoutes.get("/itemparentindexpag", async (request, response) => {
        const {page, parent} = request.query;
        var {items, parentInfos} = await itemService.parentindexpag(page, parent)
        response.json ({items, parentInfos});
    });

    itemRoutes.post("/itemstore", async (request, response) => {
        const {name, parents, owner} = request.body;
        var newItem = await itemService.store(name, parents, owner);
        response.json (newItem);
    });

    itemRoutes.put("/itemidupdate", async (request, response) => {
        const {_id} = request.query;
        const {name, parents, owner} = request.body;
        var newItem = await itemService.idupdate(_id, name, parents, owner);
        response.json (newItem);
    });

    itemRoutes.delete("/itemiddestroy", async (request, response) => {
        const {_id} = request.query;
        const item = await itemService.iddestroy(_id);
        response.json (item);
    });

module.exports = itemService;