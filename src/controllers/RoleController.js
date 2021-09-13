const { Router } = require("express");
const RoleService = require("../services/RoleService");

const roleService = new RoleService();

const roleRoutes = Router(); 

    roleRoutes.get("/rolelist", async (request, response) => {
        const {owner} = request.query;
        const roles = await roleService.list(owner);
        response.json (roles);
    });

    roleRoutes.get("/rolelistpag", async (request, response) => {
        var {page, name, owner} = request.query;
        const roles = await roleService.listpag(page, name, owner);
        response.json (roles);
    });

    roleRoutes.get("/roleidindex", async (request, response) => {
        const {_id} = request.query;
        const role = await roleService.idindex(_id);
        response.json (role);
    });

    roleRoutes.get("/rolestore", async (request, response) => {
         const {name, times, owner} = request.body;
        const newRole = await roleService.store(name, times, owner);
        response.json (newRole);
    });

    roleRoutes.get("/roleidupdate", async (request, response) => {
        const {_id} = request.query;
        const {name, timeInfos, owner} = request.body;
        const newRole = await roleService.idupdate(_id, name, timeInfos, owner);
        response.json (newRole);
    });

    roleRoutes.get("/roleiddestroy", async (request, response) => {
        const {_id} = request.query;
        const role = await roleService.iddestroy(_id); 
        response.json (role);
    });
    
module.exports = roleRoutes;