import { AtherSocketResponse, Channel, AtherWebSocket } from "../../types/ather";

export default (websocket: AtherWebSocket) => {
  return {
    append: async (data: Channel): Promise<AtherSocketResponse> => {
      return websocket.send({
        type: "atherArchive",
        archiveType: "channels",
        action: "append",
        data,
      });
    },
    get: async (id: string): Promise<Channel> => {
      const response = await websocket.send({
        type: "atherArchive",
        archiveType: "channels",
        action: "get",
        id,
      });

      if (response.status === "success" && response.data) {
        return response.data as Channel;
      }

      throw new Error("Failed to fetch channel.");
    },
    getAll: async (): Promise<Channel[]> => {
      const response: AtherSocketResponse = await websocket.send({
        type: "atherArchive",
        archiveType: "channels",
        action: "getAll",
      });

      if (response.status === "success" && Array.isArray(response.data)) {
        return response.data as Channel[];
      }

      throw new Error("Failed to fetch channels.");
    },
  };
};
