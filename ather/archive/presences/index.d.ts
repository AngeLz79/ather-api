import { AtherSocketResponse, AtherWebSocket } from "../../types/ather";
declare const _default: (websocket: AtherWebSocket) => {
    append: (data: {
        [key: string]: unknown;
    }) => Promise<AtherSocketResponse>;
    get: (id: string) => Promise<{
        [key: string]: unknown;
    }>;
};
export default _default;
