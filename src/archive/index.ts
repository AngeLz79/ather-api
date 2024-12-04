import Messages from "./messages";
import Channels from "./channels";
import Guilds from "./guilds";
import Users from "./users";
import Presences from "./presences";
import Search from "./search";
import DetailsFactory from "./details";
import { cache } from "./cache";

import { AtherWebSocket, HttpRequestFunction } from "../types/ather";

export const createArchive = (httpRequest: HttpRequestFunction, websocket: AtherWebSocket) => ({
  messages: Messages(websocket),
  channels: Channels(websocket),
  guilds: Guilds(websocket, cache),
  users: Users(websocket, httpRequest),
  presences: Presences(websocket),
  search: Search(websocket),
  details: DetailsFactory(httpRequest),
  cache,
});
