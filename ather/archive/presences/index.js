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
        append: (data) => __awaiter(void 0, void 0, void 0, function* () {
            return websocket.send({
                type: "atherArchive",
                archiveType: "presences",
                action: "append",
                data,
            });
        }),
        get: (id) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield websocket.send({
                type: "atherArchive",
                archiveType: "presences",
                action: "get",
                id,
            });
            if (response.status === "success" && response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch presence data.");
        }),
    };
};