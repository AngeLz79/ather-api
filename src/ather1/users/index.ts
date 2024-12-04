import { AtherSocketResponse, AtherWebSocket, HttpRequestFunction } from "../../types/ather";

type Response = {
    status: string;
    type: "users";
    data: Record<any, any>;
}

export default (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => {
    return {
        get: async (id: string): Promise<Response> => {
            const url = `users/get/${id}`;
            const response = await httpRequest(url, "GET");
            return response.data as Response;
        }
    };
};
