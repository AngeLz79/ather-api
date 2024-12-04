import { AtherSocketResponse, AtherWebSocket } from "../../types/ather";

export default (websocket: AtherWebSocket) => {
    return {
        append: async (data: { [key: string]: unknown }): Promise<AtherSocketResponse> => {
            return websocket.send({
                type: "atherArchive",
                archiveType: "presences",
                action: "append",
                data,
            });
        },

        get: async (id: string): Promise<{ [key: string]: unknown }> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "presences",
                action: "get",
                id,
            });

            if (response.status === "success" && response.data) {
                return response.data as { [key: string]: unknown };
            }

            throw new Error("Failed to fetch presence data.");
        },  
    };
};
