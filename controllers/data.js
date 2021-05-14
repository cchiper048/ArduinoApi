const Data = require('../models/data.js');
const { execPromise } = require('../helper.js');

const create = (user, title, data) =>
    execPromise(async() => {
        await Data.create({ user, title, data });
    })

const findAll = () => Data.find();

const findByUser = async(user, data) => data.filter(data => (data.user == user));

const findByTitle = async(title, data) => data.filter(data => (data.title == title));

const findByUserAndTitle = async (user, title, data) => data.filter(data => (data.user == user && data.title == title));

module.exports = {
    create,
    findAll,
    findByUser,
    findByTitle,
    findByUserAndTitle,
}