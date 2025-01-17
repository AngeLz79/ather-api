import { DetailsTrendsResponse, HttpRequestFunction } from "../../types/ather";

export default async (limit: number, httpRequest: HttpRequestFunction): Promise<DetailsTrendsResponse> => {
    const url = `atherArchive/detailsOvertime?limit=${limit}`;
    const response = await httpRequest(url, "GET");
    return response.data as DetailsTrendsResponse;
}