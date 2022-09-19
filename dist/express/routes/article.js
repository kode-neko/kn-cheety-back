"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_1 = require("../controller/article");
const router = (0, express_1.Router)();
router.get('/', article_1.getArticle);
router.get('/:id', article_1.getArticleId);
router.post('/', article_1.postArticle);
router.put('/', article_1.putArticle);
router.delete('/:id', article_1.deleteArticle);
exports.default = router;
