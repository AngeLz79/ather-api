import { AtherWebSocket, HttpRequestFunction } from "../../types/ather";
type Response = {
    status: string;
    type: "users";
    data: Record<any, any>;
};
declare const _default: (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => {
    get: (id: string) => Promise<Response>;
};
export default _default;
