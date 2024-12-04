import { UserSearchResults, GuildSearchResults, AtherWebSocket } from "../../types/ather";
declare const _default: (websocket: AtherWebSocket) => {
    users: (query: string, limit?: number) => Promise<UserSearchResults>;
    guilds: (query: string, limit?: number) => Promise<GuildSearchResults>;
};
export default _default;
