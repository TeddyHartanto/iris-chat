/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 */

'use strict';

var Message = require('./message.model');

// Get list of messages
exports.index = function(req, res) {
  Message.find(function (err, msgs) {
    if(err) { return handleError(res, err); }
    return res.json(200, msgs);
  });
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  Message.create(req.body, function(err, msgs) {
    if(err) { return handleError(res, err); }
    return res.json(201, msgs);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}