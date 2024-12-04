import { AtherSocketResponse, Channel, AtherWebSocket } from "../../types/ather";
declare const _default: (websocket: AtherWebSocket) => {
    append: (data: Channel) => Promise<AtherSocketResponse>;
    get: (id: string) => Promise<Channel>;
    getAll: () => Promise<Channel[]>;
};
export default _default;
