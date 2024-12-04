"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AtherSocketClient = void 0;
const events_1 = __importDefault(require("events"));
const archive_1 = require("./archive");
const ather1_1 = require("./ather1");
const websocket = __importStar(require("ws"));
const idsWaiting = [];
const build = "development";
class AtherSocketClient extends events_1.default {
    constructor(options = {
        ws_config: {},
        http_config: {}
    }) {
        var _a, _b;
        super();
        this.ws = null;
        this.token = null;
        this.token_type = "token";
        this.client = null;
        this._ready = false;
        this.httpRequest = (query, type) => __awaiter(this, void 0, void 0, function* () {
            const url = `${this.http_url.href}api/${build}/${query}`;
            const authorizationHeader = this.token_type === "access_key" ? "Bearer" : "Token";
            const options = {
                method: type,
                headers: {
                    'Authorization': `${authorizationHeader} ${this.token}`
                }
            };
            try {
                const response = yield fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        });
        this.options = options;
        this.url = new URL(((_a = options === null || options === void 0 ? void 0 : options.ws_config) === null || _a === void 0 ? void 0 : _a.url) || 'wss://ather1.net/wss');
        this.http_url = new URL(((_b = options === null || options === void 0 ? void 0 : options.http_config) === null || _b === void 0 ? void 0 : _b.url) || 'https://ather1.net/');
        this.http_options = (options === null || options === void 0 ? void 0 : options.http_config) || {};
        this.ws = null;
        this.token = null;
        this.client = null;
        this.websocket = {
            send: (data) => {
                const ws = this.ws;
                return new Promise((resolve, reject) => {
                    if (!ws)
                        return reject({ status: "error", data: 'socket not existing' });
                    const readyState = this.ws ? this.ws.readyState : -1;
                    if (readyState === websocket.OPEN) {
                        data.id = Math.random().toString(36).substr(2, 9);
                        ws.send(JSON.stringify(data));
                        if (data.type == "auth")
                            return;
                        waitForId(data.id, (data) => {
                            return resolve(data);
                        }, reject);
                    }
                    else {
                        return reject({ status: "error", data: 'socket not active' });
                    }
                });
            }
        };
        this.archive = (0, archive_1.createArchive)(this.httpRequest, this.websocket);
        this.ather1 = (0, ather1_1.createAther1)(this.httpRequest, this.websocket);
    }
    connect() {
        return new Promise((resolve, reject) => {
            const ws = new websocket.WebSocket(this.url.href);
            this.ws = ws;
            this.ws.onopen = () => {
                console.log('Connected to WebSocket server');
                this.emit('open');
                resolve(ws);
            };
            this.ws.onmessage = (event) => this.handleMessage(event);
            this.ws.onerror = (error) => {
                console.log('WebSocket error: ', error);
                reject(error);
            };
            this.ws.onclose = () => {
                console.log('WebSocket connection closed, attempting to reconnect...');
                setTimeout(() => {
                    console.log('attempting to reconnect...');
                    if (this.token) {
                        this.login(this.token, this.token_type);
                    }
                    clearInterval(pingInterval);
                }, 1000);
                console.log('socket is gone!');
                this.emit('disconnect');
            };
            const pingInterval = setInterval(() => {
                if (this.ws && this.ws.readyState === websocket.OPEN)
                    this.ws.send('ping');
            }, 10000);
        });
    }
    disconnect() {
        if (this.ws)
            this.ws.close();
    }
    handleMessage(event) {
        const data = event.data;
        if (data == "pong")
            return;
        const parsed = JSON.parse(data);
        if (parsed.type == "auth" && parsed.status == "success") {
            debugConsole(0, `authenticated to websocket server`);
            this.client = parsed.data;
            this.emit('ready', parsed.data);
        }
        else if (parsed.status == "error" && idsWaiting.findIndex(item => item.id === data.id) === -1) {
            debugConsole(2, `Unhandled error: ${parsed.data}`);
            this.emit('error', parsed.data);
        }
        handleId(parsed);
    }
    login(token, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const ws = yield this.connect();
            this.token = token;
            this.http_options.headers = {
                "Authorization": `Token ${this.token}`
            };
            const readyState = ws.readyState;
            yield new Promise((resolve) => {
                if (readyState === websocket.OPEN) {
                    resolve();
                }
                else {
                    ws.addEventListener('open', () => {
                        resolve();
                    });
                }
            });
            if (!type || (type && type === "token")) {
                this.websocket.send({
                    type: "auth",
                    token: token,
                });
            }
            else {
                this.token_type = "access_key";
                this.websocket.send({
                    type: "auth",
                    access_key: token
                });
            }
        });
    }
}
exports.AtherSocketClient = AtherSocketClient;
function waitForId(id, callback, callbackBad) {
    function callbackBadEdit(error) {
        callbackBad(error);
    }
    idsWaiting.push({ id, callback, callbackBad: callbackBadEdit, creationTime: Date.now() });
}
function handleId(data) {
    const index = idsWaiting.findIndex(item => item.id === data.id);
    if (index !== -1) {
        idsWaiting[index].callback(data); // Call the associated callback
        idsWaiting.splice(index, 1); // Remove the item from the array
    }
}
setInterval(() => {
    for (let i = 0; i < idsWaiting.length; i++) {
        if (Date.now() - idsWaiting[i].creationTime > 15000) {
            idsWaiting[i].callbackBad({ status: "error", data: "Request timed out" });
            idsWaiting.splice(i, 1);
        }
    }
}, 1000);
function debugConsole(t, ret) {
    if (t === 0) {
        console.log('[ \x1b[32mOK \x1b[0m] \x1b[32m%s\x1b[0m', ret);
    }
    else if (t === 1) {
        console.log('[ \x1b[33mWARN \x1b[0m] \x1b[33m%s\x1b[0m', ret);
    }
    else if (t === 2) {
        console.log('[ \x1b[31mERROR \x1b[0m] \x1b[31m%s\x1b[0m', ret);
    }
    else if (t === 3) {
        console.log('[ \x1b[36mINFO \x1b[0m] \x1b[36m%s\x1b[0m', ret);
    }
    else {
        console.log(ret);
    }
}
