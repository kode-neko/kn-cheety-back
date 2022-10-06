"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articles_json_1 = __importDefault(require("./articles.json"));
const users_json_1 = __importDefault(require("./users.json"));
module.exports = {
    articles: articles_json_1.default,
    users: users_json_1.default,
};
