import { User, Channel, Guild } from "../types/ather";
export interface Cache {
    users: Map<string, User>;
    channels: Map<string, Channel>;
    guilds: Map<string, Guild>;
}
export declare const cache: Cache;
