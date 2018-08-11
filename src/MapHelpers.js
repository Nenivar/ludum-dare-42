const set      = key => value => map => map.set(key, value);
const update   = key => f     => map => map.update(key, f);
const get      = key          => map => map.get(key);
const deleteK  = key          => map => map.delete(key);
const toObject =                 map => map.toObject();

module.exports = {
    set, update, get, deleteK, toObject
};
