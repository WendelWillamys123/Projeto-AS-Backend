const { Router } = require("express");
const UserService = require("../services/UserService");

const userService = new UserService();
const userRoutes = Router();

    userRoutes.get("/userlist", async (request, response) => {
        const { owner } = request.query;
        const users = await userService.list(owner);
        response.json(users);
    });

    userRoutes.get("/userlistpag", async (request, response) => {
        var { page, name, owner } = request.query;
        const users = await userService.listpag(page, name, owner );
        response.json(users);
    });

    userRoutes.get("/useridindex", async (request, response) => {
        const { _id } = request.query;
        const user = await userService.idindex(_id);
        response.json(user);
    });

    userRoutes.post("/userstore", async (request, response) => {
        const { name, PINs, roles, usedTimes, owner } = request.body;
        var newUser = await userService.store(name, PINs, roles, usedTimes, owner);
        response.json(newUser);
    });

    userRoutes.put("/useridupdate", async (request, response) => {
        const { _id } = request.query;
        const { name, PINs, roles, usedTimes, owner } = request.body;
        var newUser = await userService.idupdate(name, PINs, roles, usedTimes, owner);
        response.json(newUser);
    });

    userRoutes.delete("/useriddestroy", async (request, response) => {
        const { _id } = request.query;
        const user = await userService.iddestroy(_id);
        response.json(user);
    });


module.exports = userRoutes;