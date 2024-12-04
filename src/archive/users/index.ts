import { AtherSocketResponse, User, AtherWebSocket, HttpRequestFunction } from "../../types/ather";

const user_appendCache = new Map<string, User & { _timestamp: number }>();

export default (websocket: AtherWebSocket, httpRequest: HttpRequestFunction) => {
    return {
        append: async (data: User): Promise<AtherSocketResponse> => {
            const cache = user_appendCache.get(data.id);
            if (cache && Date.now() - cache._timestamp < 30000) {
                return {
                    status: "success",
                    type: "append",
                    action: "append",
                    id: "cached",
                };
            }

            user_appendCache.set(data.id, { ...data, _timestamp: Date.now() });
            return websocket.send({
                type: "atherArchive",
                archiveType: "users",
                action: "append",
                data,
            });
        },

        get: async (id: string, nocache = false): Promise<User> => {
            const url = `atherArchive/get/user/${id}?nocache=${nocache}`;
            const response = await httpRequest(url, "GET");

            if (response.status === "success" && response.data) {
                return response.data as User;
            }

            throw new Error("Failed to fetch user.");
        },
    };
};
