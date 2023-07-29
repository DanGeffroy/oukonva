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
const luScraper_1 = require("./luScraper");
const stationNuageScraper_1 = require("./stationNuageScraper");
const oukouvaScrap = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const luData = yield (0, luScraper_1.luScraper)();
    const stationNuageData = yield (0, stationNuageScraper_1.stationNuageScraper)();
    return {
        statusCode: 200,
        body: [...luData, ...stationNuageData],
    };
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
});
exports.oukouvaScrap = oukouvaScrap;
