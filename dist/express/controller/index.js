"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = exports.deleteUser = exports.putUser = exports.postUser = exports.getUserId = exports.getUser = exports.deleteArticle = exports.putArticle = exports.postArticle = exports.getArticleId = exports.getArticle = void 0;
const article_1 = require("./article");
Object.defineProperty(exports, "getArticle", { enumerable: true, get: function () { return article_1.getArticle; } });
Object.defineProperty(exports, "getArticleId", { enumerable: true, get: function () { return article_1.getArticleId; } });
Object.defineProperty(exports, "postArticle", { enumerable: true, get: function () { return article_1.postArticle; } });
Object.defineProperty(exports, "putArticle", { enumerable: true, get: function () { return article_1.putArticle; } });
Object.defineProperty(exports, "deleteArticle", { enumerable: true, get: function () { return article_1.deleteArticle; } });
const user_1 = require("./user");
Object.defineProperty(exports, "getUser", { enumerable: true, get: function () { return user_1.getUser; } });
Object.defineProperty(exports, "getUserId", { enumerable: true, get: function () { return user_1.getUserId; } });
Object.defineProperty(exports, "postUser", { enumerable: true, get: function () { return user_1.postUser; } });
Object.defineProperty(exports, "putUser", { enumerable: true, get: function () { return user_1.putUser; } });
Object.defineProperty(exports, "deleteUser", { enumerable: true, get: function () { return user_1.deleteUser; } });
const auth_1 = require("./auth");
Object.defineProperty(exports, "signup", { enumerable: true, get: function () { return auth_1.signup; } });
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return auth_1.login; } });
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return auth_1.logout; } });
