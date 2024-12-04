import { HttpRequestFunction } from "../../types/ather";
declare const _default: (httpRequest: HttpRequestFunction) => {
    details: () => Promise<import("../../types/ather").DetailsResponse>;
    detailsOvertime: (limit: number) => Promise<import("../../types/ather").DetailsTrendsResponse>;
    detailsTrends: (limit: number) => Promise<import("../../types/ather").DetailsTrendsResponse>;
};
export default _default;
