"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArchive = void 0;
const messages_1 = __importDefault(require("./messages"));
const channels_1 = __importDefault(require("./channels"));
const guilds_1 = __importDefault(require("./guilds"));
const users_1 = __importDefault(require("./users"));
const presences_1 = __importDefault(require("./presences"));
const search_1 = __importDefault(require("./search"));
const details_1 = __importDefault(require("./details"));
const cache_1 = require("./cache");
const createArchive = (httpRequest, websocket) => ({
    messages: (0, messages_1.default)(websocket),
    channels: (0, channels_1.default)(websocket),
    guilds: (0, guilds_1.default)(websocket, cache_1.cache),
    users: (0, users_1.default)(websocket, httpRequest),
    presences: (0, presences_1.default)(websocket),
    search: (0, search_1.default)(websocket),
    details: (0, details_1.default)(httpRequest),
    cache: cache_1.cache,
});
exports.createArchive = createArchive;
