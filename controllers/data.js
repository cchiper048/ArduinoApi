const Data = require('../models/data.js');
const { execPromise } = require('../helper.js');

const create = (user, title, data) =>
    execPromise(async() => {
        await Data.create({ user, title, data });
    });

const findAll = () =>
    execPromise(async() => {
        return Data.find();
    });

const findByUser = async(user, data) =>
    execPromise(async() => {
        return data.filter(data => (data.user == user));
    });

const findByTitle = async(title, data) =>
    execPromise(async() => {
        return data.filter(data => (data.title == title));
    });

const findByUserAndTitle = async (user, title, data) =>
    execPromise(async() => {
        return data.filter(data => (data.user == user && data.title == title));
    });

const limitFind = (data, limit) =>
    execPromise(async() => {
        return data.slice(-limit);
    });

const findOneAndUpdate = (filter, update) =>
    execPromise(async() => {
        await Data.findOneAndUpdate(
            filter,
            { $set: { ...update } },
            {
                new: true,
                useFindAndModify: false,
            },
        );
    });

module.exports = {
    create,
    findAll,
    findByUser,
    findByTitle,
    findByUserAndTitle,
    limitFind,
    findOneAndUpdate,
}