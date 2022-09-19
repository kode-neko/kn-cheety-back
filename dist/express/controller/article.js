"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.putArticle = exports.postArticle = exports.getArticleId = exports.getArticle = void 0;
function getArticle(req, res) {
    res.status(200).json([]);
}
exports.getArticle = getArticle;
function getArticleId(req, res) {
    res.status(200).json({});
}
exports.getArticleId = getArticleId;
function postArticle(req, res) {
    res.status(201).json({});
}
exports.postArticle = postArticle;
function putArticle(req, res) {
    res.status(200).json({});
}
exports.putArticle = putArticle;
function deleteArticle(req, res) {
    res.status(200).json({});
}
exports.deleteArticle = deleteArticle;
