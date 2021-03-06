const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
const { DB_URI } = process.env;


const {
    execRequest,
    start,
    } = require('./helper.js');

const Data = require('./controllers/data.js');

app.get('/', (req, res) => { //Root rute
    execRequest(req, res, 500, () => {
        const data = {
            title: "Welcome to API for Arduino projects",
            description: "More info on GitHub: Alan221b",
        };

        res.status(200).json(data);
    });
});

app.get('/data/:user/:title/:data', (req, res) => { //Create new data block
    execRequest(req, res, 400, () => {
        const {user, title, data} = req.params;
        Data.create(user, title, data);

        res.status(201).json({"message":"Successfully created"});
    });
});

app.get('/find', (req, res) => { //Find all data
    execRequest(req, res, 404, async() => {
        const data = await Data.findAll();

        res.status(200).json(data);
    });
});

app.get('/find/user/:user', (req, res) => { //Find data by user
    execRequest(req, res, 404, async() => {
        const {user} = req.params;
        const all = await Data.findAll();
        const data = await Data.findByUser(user, all);

        res.status(200).json(data);
    });
});

app.get('/find/title/:title', (req, res) => { //Find data by title
    execRequest(req, res, 404, async() => {
        const {title} = req.params;
        const all = await Data.findAll();
        const data = await Data.findByTitle(title, all);

        res.status(200).json(data);
    });
});

app.get('/find/user/:user/title/:title', (req, res) => { //Find data by user and title
    execRequest(req, res, 404, async() => {
        const {user, title} = req.params;
        const all = await Data.findAll();
        const data = await Data.findByUserAndTitle(user ,title, all);

        res.status(200).json(data);
    });
});

app.get('/user/:user/limit/:limit', (req, res) => { //Find last n(limit) by user "collection"
    execRequest(req, res, 404, async() => {
        const {user, limit} = req.params;
        const all = await Data.findAll();
        const all2 = await Data.findByUser(user, all);
        const data = await Data.limitFind(all2, limit);

        res.status(200).json(data);
    });
});

app.get('/title/:title/limit/:limit', (req, res) => { //Find last n(limit) by title "collection"
    execRequest(req, res, 404, async() => {
        const {title, limit} = req.params;
        const all = await Data.findAll();
        const all2 = await Data.findByTitle(title, all);
        const data = await Data.limitFind(all2, limit);

        res.status(200).json(data);
    });
});

app.get('/update/:user/:title/:update', (req, res) => { //Find one and update
    execRequest(req, res, 404, async() => {
        const {user, title, update} = req.params;
        const filter = {user, title};
        const data = {data: update};
        await Data.findOneAndUpdate(filter, data);

        res.status(200).json({"message": "successfully updated"});
    });
});

app.get('/delete/:_id', (req, res) => { //Delete by document id (for app)
    execRequest(req, res, 500, async() => {
        const {_id} = req.params;
        await Data.deleteOne({_id});
        res.status(200).json({"message": "successfully deleted"});
    });
});

app.get('/delete/title/:title', (req, res) => { //Delete documents by title
    execRequest(req, res, 500, async() => {
        const {title} = req.params;
        await Data.deleteMany({title});
        res.status(200).json({"message": "successfully deleted"});
    });
});

start(DB_URI, app, port);