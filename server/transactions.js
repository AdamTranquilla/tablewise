const mongoose = require("mongoose");

exports.getAll = (Model) => {
  return Model.find({});
};

exports.get = (Model, query) => {
  return Model.find(query); //return array
};

exports.getById = (Model, id) => {
  return Model.findById(id); //return document
};

exports.create = (Model, document) => {
  let _documents = new Model(document);
  return _documents.save();
};
