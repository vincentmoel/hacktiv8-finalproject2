const getAll = require('./getAll');
const store = require('./store');
const update = require('./update');
const destroy = require('./destroy');

module.exports = {
    store,
    getAll,
    update,
    destroy
};