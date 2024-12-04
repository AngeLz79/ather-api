import Users from "./users";

import { AtherWebSocket, HttpRequestFunction } from "../types/ather";

export const createAther1 = (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => ({
    users: Users(httpRequest, websocket),
});
