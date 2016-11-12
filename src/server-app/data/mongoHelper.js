//helper functions to convert to and from mongo models

module.exports.toViewModel = function toViewModel (object)  {
    const id = object._id;
    const newObject = Object.assign({},object, {id})
    delete newObject._id;

    return newObject;
}

module.exports.fromViewModel = function fromViewModel(object) {
    var _id = object.id;
    const newObject =  Object.assign({},object, {_id});
    delete newObject.id;

    return newObject;
}