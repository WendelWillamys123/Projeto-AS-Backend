const {Router} = require ("express");
const GroupService = require ("../services/GroupService");

const groupService = new GroupService ();
const groupRoutes = Router();

    groupRoutes.get ("/grouplist", async (request, response) => {
            const {owner} = request.query;
            var groups = await groupService.list(owner);
            response.json(groups);        
        }
    );

    groupRoutes.get ("/groupidindex", async (request, response) => {
            const {_id} = request.query;
            const group = await groupService.idindex(_id);
            response.json (group);
        }
    );

    groupRoutes.post ("/groupstore", async (request, response) => {
            const {name, lastParent, roles, usedTimes, owner} = request.body;
            const newGroup = await groupService.store(name, lastParent, roles, usedTimes, owner);
            response.json(newGroup);
            }
        );

    groupRoutes.put ("/groupidupdate", async (request, response) => {
            const {_id} = request.query;
            const {name, roles, usedTimes, owner} = request.body;
            const newGroup = await groupService.idupdate(_id, name, roles, usedTimes, owner);
            response.json (newGroup);
        }
    );

    groupRoutes.put ("/groupidupdatemove", async (request, response) => {
            const {_id, destination_id} = request.query;
            const newGroup = await groupService.idupdatemove(_id, destination_id);
            response.json (newGroup);
        }
    );

    groupRoutes.delete ("/groupiddestroy", async (request, response) => {
        const {_id} = request.query;
        const group = await groupService.iddestroy(_id); 
        response.json (group);
        }
    );


module.exports = groupRoutes;