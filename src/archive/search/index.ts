import { UserSearchResults, GuildSearchResults, AtherWebSocket } from "../../types/ather";

export default (websocket: AtherWebSocket) => {
    return {
        users: async (query: string, limit = 25): Promise<UserSearchResults> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "search",
                action: "users",
                query,
                limit,
            });

            if (response.status === "success" && response.data) {
                return response.data as UserSearchResults;
            }

            throw new Error("Failed to search users.");
        },
        
        guilds: async (query: string, limit = 25): Promise<GuildSearchResults> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "search",
                action: "guilds",
                query,
                limit,
            });

            if (response.status === "success" && response.data) {
                return response.data as GuildSearchResults;
            }

            throw new Error("Failed to search guilds.");
        },
    };
};
