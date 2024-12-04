import { AtherOptions, IAtherSocketClient, AtherHttpOptions, AtherWebSocket } from "./types/ather";
import EventEmitter from 'events';
import { createArchive } from "./archive";
import { createAther1 } from "./ather1";
import * as websocket from "ws";
export declare class AtherSocketClient extends EventEmitter implements IAtherSocketClient {
    options: AtherOptions;
    http_options: AtherHttpOptions;
    url: URL;
    http_url: URL;
    ws: websocket.WebSocket | null;
    token: string | null;
    token_type: "token" | "access_key";
    client: unknown | null;
    _ready: boolean;
    archive: ReturnType<typeof createArchive>;
    ather1: ReturnType<typeof createAther1>;
    websocket: AtherWebSocket;
    constructor(options?: AtherOptions);
    connect(): Promise<websocket.WebSocket>;
    disconnect(): void;
    handleMessage(event: MessageEvent): void;
    login(token: string, type: "token" | "access_key" | null): Promise<void>;
    httpRequest: (query: string, type: "GET" | "POST") => Promise<any>;
}
