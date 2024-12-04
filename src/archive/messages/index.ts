import { AtherSocketResponse, Message, AtherWebSocket } from "../../types/ather";

export default (websocket: AtherWebSocket) => {
    return {
        append: async (data: Message): Promise<AtherSocketResponse> => {
            return websocket.send({
                type: "atherArchive",
                archiveType: "messages",
                action: "append",
                data,
            });
        },
        get: async (id: string): Promise<Message> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "messages",
                action: "get",
                id,
            });

            if (response.status === "success" && response.data) {
                return response.data as Message;
            }

            throw new Error("Failed to fetch message.");
        },
        delete: async (id: string): Promise<AtherSocketResponse> => {
            return websocket.send({
                type: "atherArchive",
                archiveType: "messages",
                action: "modify",
                data: { deleted: true, id },
            });
        },
        getByUser: async (id: string, limit = 100, offset = 0): Promise<Message[]> => {
            const url = `atherArchive/get/messageByUser?userId=${id}&limit=${limit}&offset=${offset}`;
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "messages",
                action: "getByUser",
                data: { userId: id, limit, offset },
            });

            if (response.status === "success" && Array.isArray(response.data)) {
                return response.data as Message[];
            }

            throw new Error("Failed to fetch messages by user.");
        },
        getByChannel: async (id: string, channelId: string, direction: "up" | "down", limit: number): Promise<Message[]> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "messagesByChannel",
                action: "get",
                channelId,
                lastMessageId: id,
                direction,
                limit,
            });

            return Array.isArray(response.data) ? response.data : [];
        },
    };
};
