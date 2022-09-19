"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.userRouter = exports.articleRouter = void 0;
var article_1 = require("./article");
Object.defineProperty(exports, "articleRouter", { enumerable: true, get: function () { return __importDefault(article_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
