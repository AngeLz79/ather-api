import { AtherWebSocket, HttpRequestFunction } from "../types/ather";
export declare const createUsers: (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => {
    get: {
        get: (id: string) => Promise<{
            status: string;
            type: "users";
            data: Record<any, any>;
        }>;
    };
};
