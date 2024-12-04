import { AtherWebSocket, HttpRequestFunction } from "../types/ather";
export declare const createArchive: (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => {
    messages: {
        append: (data: import("../types/ather").Message) => Promise<import("../types/ather").AtherSocketResponse>;
        get: (id: string) => Promise<import("../types/ather").Message>;
        delete: (id: string) => Promise<import("../types/ather").AtherSocketResponse>;
        getByUser: (id: string, limit?: number, offset?: number) => Promise<import("../types/ather").Message[]>;
        getByChannel: (id: string, channelId: string, direction: "up" | "down", limit: number) => Promise<import("../types/ather").Message[]>;
    };
    channels: {
        append: (data: import("../types/ather").Channel) => Promise<import("../types/ather").AtherSocketResponse>;
        get: (id: string) => Promise<import("../types/ather").Channel>;
        getAll: () => Promise<import("../types/ather").Channel[]>;
    };
    guilds: {
        cache: {
            get: (id: string) => import("../types/ather").Guild | undefined;
        };
        append: (data: import("../types/ather").Guild) => Promise<import("../types/ather").AtherSocketResponse>;
        get: (id: string) => Promise<import("../types/ather").Guild>;
        getAll: () => Promise<import("../types/ather").Guild[]>;
        getChannels: (id: string) => Promise<import("../types/ather").Channel[]>;
    };
    users: {
        append: (data: import("../types/ather").User) => Promise<import("../types/ather").AtherSocketResponse>;
        get: (id: string, nocache?: boolean) => Promise<import("../types/ather").User>;
    };
    presences: {
        append: (data: {
            [key: string]: unknown;
        }) => Promise<import("../types/ather").AtherSocketResponse>;
        get: (id: string) => Promise<{
            [key: string]: unknown;
        }>;
    };
    search: {
        users: (query: string, limit?: number) => Promise<import("../types/ather").UserSearchResults>;
        guilds: (query: string, limit?: number) => Promise<import("../types/ather").GuildSearchResults>;
    };
    details: {
        details: () => Promise<import("../types/ather").DetailsResponse>;
        detailsOvertime: (limit: number) => Promise<import("../types/ather").DetailsTrendsResponse>;
        detailsTrends: (limit: number) => Promise<import("../types/ather").DetailsTrendsResponse>;
    };
    cache: import("./cache").Cache;
};
