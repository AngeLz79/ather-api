import { HttpRequestFunction } from "../../types/ather"
import detailsFn from "./details"
import detailsOvertime from "./detailsOvertime"
import detailsTrends from "./detailsTrends"

export default (httpRequest: HttpRequestFunction) => ({
    details: () => detailsFn(httpRequest),
    detailsOvertime: (limit: number) => detailsOvertime(limit, httpRequest),
    detailsTrends: (limit: number) => detailsTrends(limit, httpRequest)
});