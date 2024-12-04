"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsers = void 0;
const get_1 = __importDefault(require("./get"));
const createUsers = (httpRequest, websocket) => ({
    get: (0, get_1.default)(httpRequest, websocket),
});
exports.createUsers = createUsers;
