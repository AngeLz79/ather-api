"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getGuild_1 = __importDefault(require("./getGuild"));
exports.default = (websocket, cache) => {
    // Create the get function inside the guilds object to avoid 'this' issues
    return {
        cache: {
            get: (id) => {
                const cachedGuild = cache.guilds.get(id);
                if (cachedGuild) {
                    return cachedGuild;
                }
                // Call the getGuild function instead of 'this.get'
                (0, getGuild_1.default)(id, websocket, cache);
                return undefined;
            },
        },
        append: (data) => __awaiter(void 0, void 0, void 0, function* () {
            return websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "append",
                data,
            });
        }),
        get: (id) => (0, getGuild_1.default)(id, websocket, cache),
        getAll: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "getAll",
            });
            if (response.status === "success" && Array.isArray(response.data)) {
                const guilds = response.data;
                guilds.forEach((guild) => {
                    cache.guilds.set(guild.id, guild); // Cache each fetched guild
                });
                return guilds;
            }
            throw new Error("Failed to fetch guilds.");
        }),
        getChannels: (id) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "getChannels",
                data: id,
            });
            return Array.isArray(response.data) ? response.data : [];
        }),
    };
};
