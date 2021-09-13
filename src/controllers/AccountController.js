const {Router} = require ("express");
const AccountService = require ("../services/AccountService");

const accountService = new AccountService ();
const accountRoutes = Router();

    accountRoutes.get ("/accountlist", async (request, response) => {
            var accounts = await accountService.list();
            response.json(accounts);
        }
    );

    accountRoutes.get ("/accountlist", async (request, response) => {
            const {_id} = request.query;
            const account = await accountService.idindex(_id);
            response.json (account);
        }
    );

    accountRoutes.get ("/accountloginindex", async (request, response) => {
            const {email, password} = request.query;
            const account = await accountService.loginindex(email, password);
            response.json (account);
        }
    );

    accountRoutes.post ("/accountstore", async (request, response) => {
        const {name, email, password} = request.body;
        const newAccount = await accountService.store(name, email, password);
        response.json(newAccount);
        }
    );

    accountRoutes.put ("/accountlist", async (request, response) => {
        const {_id} = request.query;
        const {name, email, password} = request.body;
        const newAccount = await accountService.idupdate(_id, name, email, password); iddestroy
        response.json (newAccount);
        }
    );

    accountRoutes.delete ("/accountlist", async (request, response) => {
        const {_id} = request.query;
        const account = await accountService.iddestroy(_id); 
        response.json (account);
        }
    );


module.exports = accountRoutes;