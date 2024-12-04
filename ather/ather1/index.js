"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAther1 = void 0;
const users_1 = __importDefault(require("./users"));
const createAther1 = (httpRequest, websocket) => ({
    users: (0, users_1.default)(httpRequest, websocket),
});
exports.createAther1 = createAther1;
