"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oukouvaScrap = void 0;
const luScraper_1 = require("./scrapers/luScraper");
const macadamScraper_1 = require("./scrapers/macadamScraper");
const stationNuageScraper_1 = require("./scrapers/stationNuageScraper");
const warehouseScraper_1 = require("./scrapers/warehouseScraper");
const oukouvaScrap = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const oneWeekLaterDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const luData = yield (0, luScraper_1.luScraper)(today, oneWeekLaterDate);
    const stationNuageData = yield (0, stationNuageScraper_1.stationNuageScraper)(today, oneWeekLaterDate);
    const warehouseData = yield (0, warehouseScraper_1.warehouseScraper)(today, oneWeekLaterDate);
    const macadamData = yield (0, macadamScraper_1.macadamScraper)(today, oneWeekLaterDate);
    return {
        statusCode: 200,
        body: [...warehouseData, ...macadamData, ...luData, ...stationNuageData],
    };
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
});
exports.oukouvaScrap = oukouvaScrap;
