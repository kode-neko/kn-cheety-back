"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/article', index_1.articleRouter);
app.use('/user', index_1.userRouter);
app.use('/auth', index_1.authRouter);
app.use(express_1.default.json());
app.listen(process.env.SERVER_PORT);
