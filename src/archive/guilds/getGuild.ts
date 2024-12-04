import { AtherWebSocket } from "../../types/ather";
import { Guild } from "../../types/ather";
import { Cache } from "../cache";

export default async (id: string, websocket: AtherWebSocket, cache: Cache): Promise<Guild> => {
    const response = await websocket.send({
      type: "atherArchive",
      archiveType: "guilds",
      action: "get",
      data: id,
    });

    if (response.status === "success" && response.data) {
      const guild = response.data as Guild;
      cache.guilds.set(id, guild); // Cache the fetched guild
      return guild;
    }

    throw new Error("Failed to fetch guild.");
};