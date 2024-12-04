import { AtherSocketResponse, User, AtherWebSocket, HttpRequestFunction } from "../../types/ather";
declare const _default: (websocket: AtherWebSocket, httpRequest: HttpRequestFunction) => {
    append: (data: User) => Promise<AtherSocketResponse>;
    get: (id: string, nocache?: boolean) => Promise<User>;
};
export default _default;
