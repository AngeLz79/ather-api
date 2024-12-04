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
const user_appendCache = new Map();
exports.default = (websocket, httpRequest) => {
    return {
        append: (data) => __awaiter(void 0, void 0, void 0, function* () {
            const cache = user_appendCache.get(data.id);
            if (cache && Date.now() - cache._timestamp < 30000) {
                return {
                    status: "success",
                    type: "append",
                    action: "append",
                    id: "cached",
                };
            }
            user_appendCache.set(data.id, Object.assign(Object.assign({}, data), { _timestamp: Date.now() }));
            return websocket.send({
                type: "atherArchive",
                archiveType: "users",
                action: "append",
                data,
            });
        }),
        get: (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, nocache = false) {
            const url = `atherArchive/get/user/${id}?nocache=${nocache}`;
            const response = yield httpRequest(url, "GET");
            if (response.status === "success" && response.data) {
                return response.data;
            }
            throw new Error("Failed to fetch user.");
        }),
    };
};
