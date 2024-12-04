import { AtherSocketResponse, Message, AtherWebSocket } from "../../types/ather";
declare const _default: (websocket: AtherWebSocket) => {
    append: (data: Message) => Promise<AtherSocketResponse>;
    get: (id: string) => Promise<Message>;
    delete: (id: string) => Promise<AtherSocketResponse>;
    getByUser: (id: string, limit?: number, offset?: number) => Promise<Message[]>;
    getByChannel: (id: string, channelId: string, direction: "up" | "down", limit: number) => Promise<Message[]>;
};
export default _default;
