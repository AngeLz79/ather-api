import { DetailsResponse, HttpRequestFunction } from "../../types/ather";

export default async (httpRequest: HttpRequestFunction): Promise<DetailsResponse> => {
    const url = `atherArchive/details`;
    const response = await httpRequest(url, "GET");
    return response.data as DetailsResponse;
}