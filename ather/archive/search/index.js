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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (websocket) => {
    return {
        users: (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, limit = 25) {
            const response = yield websocket.send({
                type: "atherArchive",
                archiveType: "search",
                action: "users",
                query,
                limit,
            });
            if (response.status === "success" && response.data) {
                return response.data;
            }
            throw new Error("Failed to search users.");
        }),
        guilds: (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, limit = 25) {
            const response = yield websocket.send({
                type: "atherArchive",
                archiveType: "search",
                action: "guilds",
                query,
                limit,
            });
            if (response.status === "success" && response.data) {
                return response.data;
            }
            throw new Error("Failed to search guilds.");
        }),
    };
};
