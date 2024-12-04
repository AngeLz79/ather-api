import { AtherSocketResponse, Channel, Guild, AtherWebSocket } from "../../types/ather";
import { Cache } from "../cache";
declare const _default: (websocket: AtherWebSocket, cache: Cache) => {
    cache: {
        get: (id: string) => Guild | undefined;
    };
    append: (data: Guild) => Promise<AtherSocketResponse>;
    get: (id: string) => Promise<Guild>;
    getAll: () => Promise<Guild[]>;
    getChannels: (id: string) => Promise<Channel[]>;
};
export default _default;
