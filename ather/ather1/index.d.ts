import { AtherWebSocket, HttpRequestFunction } from "../types/ather";
export declare const createAther1: (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => {
    users: {
        get: (id: string) => Promise<{
            status: string;
            type: "users";
            data: Record<any, any>;
        }>;
    };
};
