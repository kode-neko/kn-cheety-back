"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserId = exports.getUser = void 0;
function getUser(req, res) {
    res.status(200).json(req.body);
}
exports.getUser = getUser;
function getUserId(req, res) {
    res.status(200).json(req.body);
}
exports.getUserId = getUserId;
function postUser(req, res) {
    res.status(200).json(req.body);
}
exports.postUser = postUser;
function putUser(req, res) {
    res.status(200).json(req.body);
}
exports.putUser = putUser;
function deleteUser(req, res) {
    res.status(200).json(req.body);
}
exports.deleteUser = deleteUser;
