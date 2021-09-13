const express = require ("express");
const cors = require ("cors");

const mongoose = require ("mongoose");

const accountRoutes = require ("./controllers/AccountController");
const groupRoutes = require ("./controllers/GroupController");
const itemRoutes = require ("./controllers/ItemController");
const lockRoutes = require ("./controllers/LockController");
const logRoutes = require ("./controllers/LogController");
const roleRoutes = require ("./controllers/RoleController");
const timeRoutes = require ("./controllers/TimeController");
const userRoutes = require ("./controllers/UserController");

const {addToSchedules} = require ("./managers/scheduleManager");
const {addToMonitors} = require ("./managers/monitorManager");

const app = express ();

mongoose.connect
(
    "mongodb+srv://Capeudinho:kenjin202530@cluster0-yh3ut.mongodb.net/smart_lock?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then
(
    async () =>
    {
        await addToMonitors ();
        await addToSchedules ();
    }
)

app.use (cors ());
app.use (express.json ());

app.use (accountRoutes);
app.use (groupRoutes);
app.use (itemRoutes);
app.use (lockRoutes);
app.use (logRoutes);
app.use (roleRoutes);
app.use (timeRoutes);
app.use (userRoutes);

app.listen (3333);

module.exports = app;

// const io = require ("./managers/websocketManager");
const client = require ("./managers/accessManager");