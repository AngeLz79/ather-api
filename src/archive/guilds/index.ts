import { AtherSocketResponse, Channel, Guild, AtherWebSocket } from "../../types/ather";
import { Cache } from "../cache";
import getGuild from "./getGuild";

export default (websocket: AtherWebSocket, cache: Cache) => {
  // Create the get function inside the guilds object to avoid 'this' issues
    return {
        cache: {
            get: (id: string): Guild | undefined => {
                const cachedGuild = cache.guilds.get(id);
                if (cachedGuild) {
                    return cachedGuild;
                }

                // Call the getGuild function instead of 'this.get'
                getGuild(id, websocket, cache);
                return undefined;
            },
        },
        append: async (data: Guild): Promise<AtherSocketResponse> => {
            return websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "append",
                data,
            });
        },
        get: (id: string) => getGuild(id, websocket, cache),
        getAll: async (): Promise<Guild[]> => {
            const response: AtherSocketResponse = await websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "getAll",
            });

            if (response.status === "success" && Array.isArray(response.data)) {
                const guilds = response.data as Guild[];
                guilds.forEach((guild) => {
                    cache.guilds.set(guild.id, guild); // Cache each fetched guild
                });
                return guilds;
            }

            throw new Error("Failed to fetch guilds.");
        },
        getChannels: async (id: string): Promise<Channel[]> => {
            const response = await websocket.send({
                type: "atherArchive",
                archiveType: "guilds",
                action: "getChannels",
                data: id,
            });

            return Array.isArray(response.data) ? response.data : [];
        },
    };
};
