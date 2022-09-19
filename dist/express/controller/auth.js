"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
function signup(req, res) {
    res.status(200).json(req.body);
}
exports.signup = signup;
function login(req, res) {
    res.status(200).json(req.body);
}
exports.login = login;
function logout(req, res) {
    res.status(200).json(req.body);
}
exports.logout = logout;
