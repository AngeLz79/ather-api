"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const details_1 = __importDefault(require("./details"));
const detailsOvertime_1 = __importDefault(require("./detailsOvertime"));
const detailsTrends_1 = __importDefault(require("./detailsTrends"));
exports.default = (httpRequest) => ({
    details: () => (0, details_1.default)(httpRequest),
    detailsOvertime: (limit) => (0, detailsOvertime_1.default)(limit, httpRequest),
    detailsTrends: (limit) => (0, detailsTrends_1.default)(limit, httpRequest)
});
